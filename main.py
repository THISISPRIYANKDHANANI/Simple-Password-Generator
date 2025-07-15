# Password Generator Web App
# Created for generating secure passwords with customizable options
# Uses Flask for the web interface and secrets module for cryptographic randomness

from flask import Flask, render_template, request, jsonify
import random
import string
import secrets

# Initialize Flask application
app = Flask(__name__)

def make_password(length=12, use_lower=True, use_upper=True, use_nums=True, use_symbols=True, exclude=""):
    """
    Generate a random password with specified criteria
    This is the core function that builds passwords based on user preferences
    """
    # Start with empty character set
    chars = ""

    # Add character types based on user selection
    if use_lower:
        chars += string.ascii_lowercase  # a-z
    if use_upper:
        chars += string.ascii_uppercase  # A-Z
    if use_nums:
        chars += string.digits  # 0-9
    if use_symbols:
        chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"  # Common symbols

    # Remove any characters the user wants to exclude
    if exclude:
        chars = ''.join(c for c in chars if c not in exclude)

    # Safety check - make sure we have characters to work with
    if not chars:
        return "Error: No characters available"

    # Generate the password using cryptographically secure random
    password = ''.join(secrets.choice(chars) for _ in range(length))
    return password

def check_strength(password):
    """
    Analyze password strength and provide feedback
    Returns a score (0-100), strength level, and improvement tips
    """
    if not password:
        return 0, "No Password", ["Enter a password"]

    score = 0
    tips = []

    # Length is the most important factor for password security
    if len(password) >= 12:
        score += 30  # Good length
    elif len(password) >= 8:
        score += 20  # Acceptable but could be longer
        tips.append("Try using at least 12 characters")
    else:
        score += 10  # Too short
        tips.append("Password is too short")

    # Check what types of characters are used
    has_lower = any(c.islower() for c in password)
    has_upper = any(c.isupper() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_symbol = any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password)

    # Give points for each character type used
    char_types = sum([has_lower, has_upper, has_digit, has_symbol])
    score += char_types * 15

    # Provide specific suggestions for missing character types
    if not has_lower:
        tips.append("Add lowercase letters")
    if not has_upper:
        tips.append("Add uppercase letters")
    if not has_digit:
        tips.append("Add numbers")
    if not has_symbol:
        tips.append("Add symbols")

    # Convert score to human-readable strength level
    if score >= 80:
        level = "Very Strong"
    elif score >= 60:
        level = "Strong"
    elif score >= 40:
        level = "Medium"
    elif score >= 20:
        level = "Weak"
    else:
        level = "Very Weak"

    return score, level, tips

def improve_password(old_password, target_len=16):
    """
    Take a weak password and make it stronger
    Uses character substitution and adds complexity
    """
    new_password = old_password

    # Replace common letters with similar-looking symbols (leet speak style)
    replacements = {'a': '@', 'e': '3', 'i': '!', 'o': '0', 's': '$'}
    for old_char, new_char in replacements.items():
        if old_char in new_password.lower():
            new_password = new_password.replace(old_char, new_char, 1)

    # If password is still too short, add random strong characters
    while len(new_password) < target_len:
        new_password += random.choice('!@#$%^&*123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')

    return new_password

# Web routes - these handle the different pages and API calls

@app.route('/')
def home():
    """Main page - serves the password generator interface"""
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    """
    API endpoint for generating passwords
    Receives user preferences and returns a password with strength analysis
    """
    try:
        # Get the user's preferences from the web form
        data = request.get_json()

        # Extract settings with sensible defaults
        length = int(data.get('length', 12))
        use_lower = bool(data.get('lowercase', True))
        use_upper = bool(data.get('uppercase', True))
        use_nums = bool(data.get('digits', True))
        use_symbols = bool(data.get('symbols', True))
        exclude = str(data.get('exclude', ''))

        # Make sure user selected at least one character type
        if not any([use_lower, use_upper, use_nums, use_symbols]):
            return jsonify({'success': False, 'error': 'Select at least one character type'})

        # Generate the password and analyze its strength
        password = make_password(length, use_lower, use_upper, use_nums, use_symbols, exclude)
        score, level, tips = check_strength(password)

        # Send back the results
        return jsonify({
            'success': True,
            'password': password,
            'strength': {
                'score': score,
                'level': level,
                'feedback': tips
            }
        })

    except Exception as e:
        # If something goes wrong, send back an error message
        return jsonify({'success': False, 'error': str(e)})

@app.route('/enhance', methods=['POST'])
def enhance():
    """
    API endpoint for improving weak passwords
    Takes an existing password and makes it stronger
    """
    try:
        # Get the password to improve
        data = request.get_json()
        old_pass = data.get('password', '')
        target_len = int(data.get('target_length', 16))

        # Make sure they actually provided a password
        if not old_pass:
            return jsonify({'success': False, 'error': 'No password provided'})

        # Improve the password
        new_pass = improve_password(old_pass, target_len)

        # Analyze both the old and new passwords
        old_score, old_level, old_tips = check_strength(old_pass)
        new_score, new_level, new_tips = check_strength(new_pass)

        # Send back the comparison
        return jsonify({
            'success': True,
            'original': {
                'password': old_pass,
                'score': old_score,
                'level': old_level,
                'feedback': old_tips
            },
            'enhanced': {
                'password': new_pass,
                'score': new_score,
                'level': new_level,
                'feedback': new_tips
            },
            'improvement': new_score - old_score
        })

    except Exception as e:
        # Handle any errors that might occur
        return jsonify({'success': False, 'error': str(e)})

# Start the web server when this file is run directly
if __name__ == '__main__':
    print("Starting Password Generator...")
    print("Open your browser to: http://localhost:5000")
    app.run(debug=True, port=5000)
