# Password Generator

COMPANY: Oasis Infobyte

NAME: Priyank Dhanani

"INTERN ID: OIB/J1/IP3779

*DOMAIN: PYTHON PROGRAMMING

*DURATION: 4 WEEEKS

A web-based tool for creating secure passwords. I built this to help people generate strong passwords easily without having to think about all the security requirements.

## What it does

This tool helps you create secure passwords with lots of customization options:

- **Easy to use**: Just drag the slider and check the boxes you want
- **Real-time updates**: The password changes as you adjust settings
- **Length control**: Pick anywhere from 4 to 64 characters
- **Character types**: Choose lowercase, uppercase, numbers, and symbols
- **Exclude characters**: Don't want certain characters? Just type them in the exclude box
- **Strength checker**: Shows you how strong your password is with a color bar
- **Copy button**: One click to copy the password
- **Password improver**: Got a weak password? The tool can make it stronger
- **Works everywhere**: Designed to work on phones, tablets, and computers

## Installation

### Prerequisites
- Python 3.6 or higher
- pip (Python package installer)

### Setup
1. Clone or download this repository
2. Navigate to the project directory
3. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Dependencies
- **pyperclip**: For clipboard functionality in the GUI version
- **tkinter**: Built-in with Python (for GUI)

## How to run it

1. **First, install Flask** (the web framework I used):
   ```bash
   pip install Flask
   ```

2. **Start the server:**
   ```bash
   python main.py
   ```

3. **Open your web browser and go to:**
   ```
   http://localhost:5000
   ```

That's it! You should see the password generator interface.

## Project structure

I organized the code into separate files to keep things clean:

```
password_generator/
├── main.py                    # The main Flask app (Python)
├── requirements.txt           # What you need to install
├── README.md                  # This file
├── templates/
│   └── index.html            # The web page layout
└── static/
    ├── css/
    │   └── style.css         # How it looks (styling)
    └── js/
        └── script.js         # How it works (JavaScript)
```

## How to use it

### Making passwords
1. **Set the length**: Drag the slider to pick how long you want it (4-64 characters)
2. **Pick character types**: Check the boxes for what you want:
   - Lowercase letters (a-z)
   - Uppercase letters (A-Z)
   - Numbers (0-9)
   - Symbols (!@#$...)
3. **Exclude stuff**: If you don't want certain characters, type them in the exclude box
4. **Get your password**: It generates automatically as you change things
5. **Copy it**: Click the copy button to put it on your clipboard

### Making weak passwords stronger
Sometimes you have an existing password that's not very strong. The tool can help:

1. Type your current password in the "enhancement" section
2. Pick how long you want the new one to be
3. Click "Enhance" and it'll make it much stronger
4. You can see the before/after comparison

### Why I built this
I got tired of trying to come up with secure passwords myself, and a lot of online generators are either too simple or look sketchy. This one gives you full control over what goes into your password, shows you how strong it is, and works on any device.

## Security Features

### Password Strength Analysis
The GUI version includes a comprehensive strength analyzer that evaluates:
- **Length**: Longer passwords receive higher scores
- **Character Variety**: Mix of uppercase, lowercase, numbers, and symbols
- **Pattern Detection**: Identifies and penalizes common patterns
- **Common Words**: Detects and warns about dictionary words
- **Sequential Characters**: Flags sequential numbers or letters

### Strength Scoring
- **Very Strong (80-100)**: Excellent security
- **Strong (60-79)**: Good security with minor improvements possible
- **Medium (40-59)**: Adequate but could be stronger
- **Weak (20-39)**: Poor security, needs improvement
- **Very Weak (0-19)**: Unacceptable security level

### Security Best Practices Implemented
- Guaranteed character type representation
- Cryptographically secure randomization
- Pattern avoidance algorithms
- Configurable exclusion options
- Strength-based regeneration

## Code Structure

### Core Classes

#### `PasswordGenerator` (CLI)
- Basic password generation with user-defined criteria
- Input validation and error handling
- Character set management

#### `AdvancedPasswordGenerator` (GUI)
- Enhanced security features
- Advanced exclusion options
- Strength-based generation

#### `PasswordStrengthAnalyzer` (GUI)
- Comprehensive strength analysis
- Security feedback generation
- Pattern detection algorithms

#### `PasswordGeneratorGUI` (GUI)
- Complete Tkinter interface
- Event handling and user interactions
- History management and clipboard integration

## Key Programming Concepts Demonstrated

### 1. Randomization
- Secure random character selection
- Password shuffling to avoid patterns
- Cryptographically appropriate randomness

### 2. User Input Validation
- Type checking and range validation
- Error handling with user-friendly messages
- Default value management

### 3. Character Set Handling
- Dynamic character set construction
- Exclusion filtering
- Character type guarantees

### 4. GUI Design (Advanced Version)
- Responsive layout with proper widget arrangement
- Event-driven programming
- User experience optimization

### 5. Security Rules Implementation
- Password strength algorithms
- Pattern detection and avoidance
- Security best practices enforcement

### 6. Clipboard Integration
- Cross-platform clipboard access
- Error handling for clipboard operations
- User feedback for successful operations

## Customization Options

### CLI Version
- Password length (1-128 characters)
- Character type inclusion/exclusion
- Custom character exclusions
- Multiple generation sessions

### GUI Version
- All CLI features plus:
- Visual similar character exclusion
- Ambiguous character filtering
- Strength requirement enforcement
- History management
- Real-time strength feedback

## Error Handling

Both versions include comprehensive error handling for:
- Invalid input values
- Empty character sets
- Clipboard access failures
- System compatibility issues

## Future Enhancements

Potential improvements for advanced users:
- Password policy compliance checking
- Export/import functionality for password history
- Batch password generation
- Integration with password managers
- Custom character set definitions
- Pronunciation guides for generated passwords

## Contributing

This project is designed for educational purposes. Feel free to:
- Add new features
- Improve the user interface
- Enhance security algorithms
- Add unit tests
- Optimize performance

## License

This project is provided for educational purposes. Feel free to use, modify, and distribute as needed.

## Troubleshooting

### Common Issues

1. **"pyperclip module not found"**
   - Solution: Install with `pip install pyperclip`

2. **GUI doesn't start**
   - Ensure tkinter is available (usually built-in with Python)
   - Try: `python -m tkinter` to test tkinter installation

3. **Clipboard functionality not working**
   - Ensure pyperclip is installed and compatible with your system
   - Some Linux systems may require additional packages

4. **Password appears weak despite settings**
   - Try increasing length or enabling more character types
   - Disable "ensure strength" temporarily if needed

For additional help, check the error messages and ensure all dependencies are properly installed.

# output
![img](https://github.com/user-attachments/assets/a56be603-25fe-4baf-b8aa-aba73e747089")
![img](https://github.com/user-attachments/assets/fd928272-a824-4994-9cfc-57eafea9979b)
![img](https://github.com/user-attachments/assets/0358df67-bdf1-40cb-8f5b-c1fb73119aef)
