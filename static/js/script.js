/*
 * Password Generator JavaScript
 * Handles all the interactive features on the web page
 * Written to be simple and easy to understand
 */

// When the user moves the length slider, update the number display
document.getElementById('length').addEventListener('input', function() {
    document.getElementById('lengthDisplay').textContent = this.value;
});

// Set up automatic password generation when any setting changes
// This makes the interface feel more responsive
document.querySelectorAll('#length, #lowercase, #uppercase, #digits, #symbols, #exclude').forEach(element => {
    element.addEventListener('input', function() {
        // Small delay to avoid generating too many passwords while user is typing
        setTimeout(generatePassword, 300);
    });
});

// Main function to generate a new password
async function generatePassword() {
    // Collect all the user's preferences
    const data = {
        length: parseInt(document.getElementById('length').value),
        lowercase: document.getElementById('lowercase').checked,
        uppercase: document.getElementById('uppercase').checked,
        digits: document.getElementById('digits').checked,
        symbols: document.getElementById('symbols').checked,
        exclude: document.getElementById('exclude').value
    };

    try {
        // Send the request to our Flask server
        const response = await fetch('/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Show the new password and its strength
            displayPassword(result.password, result.strength);
        } else {
            // Something went wrong, show the error
            showNotification(result.error, 'error');
        }
    } catch (error) {
        // Network error or other problem
        showNotification('Failed to generate password', 'error');
    }
}

// Show the generated password on the page
function displayPassword(password, strength) {
    const display = document.getElementById('passwordDisplay');
    if (display) {
        display.textContent = password;
        display.className = 'password-display generated';  // Changes the styling to show it's generated
    }
    // Also update the strength meter
    updateStrengthMeter(strength);
}

// Update the visual strength meter and feedback
function updateStrengthMeter(strength) {
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    const feedback = document.getElementById('feedback');

    // Update the colored progress bar
    if (fill) {
        fill.style.width = strength.score + '%';
        // Change color based on strength level (very-weak = red, very-strong = green)
        fill.className = 'strength-fill ' + strength.level.toLowerCase().replace(' ', '-');
    }

    // Update the strength text
    if (text) {
        text.textContent = `Password Strength: ${strength.level} (${strength.score}/100)`;
    }

    // Show helpful suggestions or congratulate on strong password
    if (feedback && strength.feedback) {
        if (strength.feedback.length > 0) {
            // Show specific suggestions for improvement
            feedback.innerHTML = '<strong>Suggestions:</strong><ul>' +
                strength.feedback.map(item => `<li>${item}</li>`).join('') + '</ul>';
        } else {
            // Password is already strong
            feedback.innerHTML = '<strong>Excellent!</strong> This password is very secure.';
        }
    }
}

// Copy the generated password to clipboard
async function copyPassword() {
    const passwordDisplay = document.getElementById('passwordDisplay');
    if (!passwordDisplay) return;

    const password = passwordDisplay.textContent;

    // Make sure there's actually a password to copy
    if (!password || password.includes('Click')) {
        showNotification('No password to copy', 'error');
        return;
    }

    try {
        // Use the modern clipboard API
        await navigator.clipboard.writeText(password);
        showNotification('Password copied!', 'success');
    } catch (error) {
        // Clipboard access failed (maybe browser doesn't support it)
        showNotification('Failed to copy', 'error');
    }
}

// Take a weak password and make it stronger
async function enhancePassword() {
    const weakPassword = document.getElementById('weakPassword').value;
    const targetLength = parseInt(document.getElementById('targetLength').value);

    // Make sure the user entered a password
    if (!weakPassword) {
        showNotification('Please enter a password to enhance', 'error');
        return;
    }

    try {
        // Send the weak password to our server for improvement
        const response = await fetch('/enhance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: weakPassword,
                target_length: targetLength
            })
        });

        const result = await response.json();

        if (result.success) {
            // Show the before and after comparison
            showEnhancementResults(result);
        } else {
            showNotification(result.error, 'error');
        }
    } catch (error) {
        showNotification('Failed to enhance password', 'error');
    }
}

// Display the before/after comparison for password enhancement
function showEnhancementResults(result) {
    // Get all the elements we need to update
    const elements = {
        beforePassword: document.getElementById('beforePassword'),
        afterPassword: document.getElementById('afterPassword'),
        beforeStrength: document.getElementById('beforeStrength'),
        afterStrength: document.getElementById('afterStrength'),
        improvementDetails: document.getElementById('improvementDetails'),
        enhancementResults: document.getElementById('enhancementResults')
    };

    // Fill in the before and after passwords
    if (elements.beforePassword) elements.beforePassword.textContent = result.original.password;
    if (elements.afterPassword) elements.afterPassword.textContent = result.enhanced.password;

    // Show the strength scores
    if (elements.beforeStrength) elements.beforeStrength.textContent = `${result.original.level} (${result.original.score}/100)`;
    if (elements.afterStrength) elements.afterStrength.textContent = `${result.enhanced.level} (${result.enhanced.score}/100)`;

    // Show how much we improved
    if (elements.improvementDetails) {
        elements.improvementDetails.innerHTML = `<strong>Improvement:</strong> +${result.improvement} points<br><strong>Your password is now much stronger!</strong>`;
    }

    // Make the results section visible
    if (elements.enhancementResults) {
        elements.enhancementResults.style.display = 'block';
    }

    // Let the user know it worked
    showNotification('Password enhanced successfully!', 'success');
}

// Show a temporary notification message to the user
function showNotification(message, type) {
    // Create a new notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;  // 'success' or 'error'
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate it in
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove it after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        // Wait for animation to finish before removing from DOM
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Generate an initial password when the page first loads
// This gives users something to see right away
generatePassword();
