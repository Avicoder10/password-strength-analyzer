# 🔐 Password Strength Analyzer

A cybersecurity project built using Python, Flask, HTML, CSS, and JavaScript to analyze password characteristics and provide security recommendations.

## Features

- Password strength classification
- Password length and character checks
- Common password detection
- Estimated password entropy
- Live strength meter
- Security recommendations
- Copyable security report
- Show/Hide password option

## Technologies Used

- Python
- Flask
- HTML5
- CSS3
- JavaScript
- Regular Expressions

## Project Structure

```text
Password-Strength-Analyzer/
├── app.py
├── password_checker.py
├── common_passwords.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## Installation and Setup

1. Install Python 3.
2. Open a terminal in the project directory.
3. Install Flask:

   `python -m pip install flask`

4. Run the application:

   `python app.py`

5. Open `http://127.0.0.1:5000` in your browser.

## Security Notes

- Use dummy passwords for testing.
- The common-password list is a limited demonstration list.
- Entropy is an estimate, not a guarantee of password security.
- Do not enter real or sensitive passwords into an experimental application.
- This project is intended for educational purposes.

## Future Improvements

- Larger curated common-password dataset
- Improved password-strength estimation
- Automated unit tests
- Improved accessibility and user experience

## Author

Cybersecurity learner | Python Developer
