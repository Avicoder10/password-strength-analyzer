
# 🔐 Password Strength Analyzer

<p align="center">
  <b>A Python & Flask-based Cybersecurity Project</b>
  <br>
  Analyze password characteristics and get actionable security recommendations.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.x-blue?logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-Web%20Framework-black?logo=flask" alt="Flask">
  <img src="https://img.shields.io/badge/HTML5-Frontend-orange?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/JavaScript-Frontend-yellow?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Status-Educational%20Project-green" alt="Project Status">
</p>

## 📌 Overview

Password Strength Analyzer is an educational cybersecurity web application built with Python, Flask, HTML, CSS, and JavaScript.

It evaluates password characteristics, classifies password strength, estimates entropy, detects matches against a limited common-password list, and provides security recommendations.

## ✨ Features

- 🔍 Password strength classification
- 📏 Password length and character checks
- 🚫 Common-password detection using a local list
- 📊 Estimated password entropy
- ⚡ Live password strength meter
- 🛡️ Actionable security recommendations
- 📋 Copyable security report
- 👁️ Show/Hide password option

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Python | Password analysis logic |
| Flask | Web application backend |
| HTML5 | Page structure |
| CSS3 | User interface and styling |
| JavaScript | Interactive features |
| Regular Expressions | Character-pattern checks |

## 📂 Project Structure

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

## ⚙️ Installation & Setup

### Prerequisites

- Python 3 installed
- Git installed (optional)

### 1. Clone the repository

```bash
git clone https://github.com/Avicoder10/password-strength-analyzer.git
```

### 2. Enter the project directory

```bash
cd password-strength-analyzer
```

### 3. Install Flask

```bash
python -m pip install flask
```

### 4. Run the application

```bash
python app.py
```

### 5. Open in your browser

Visit:

```text
http://127.0.0.1:5000
```

## 🔒 Security Considerations

- Use dummy passwords for testing.
- Never enter real or sensitive passwords into an experimental application.
- The bundled common-password list is limited and does not represent a complete database.
- Entropy estimates are theoretical approximations, not guarantees of password security.
- Character variety alone does not guarantee that a password is secure.
- Do not assume passwords are stored or transmitted securely without reviewing the application code.

## 🚀 Future Improvements

- Integrate a larger, curated common-password dataset.
- Improve password-strength estimation.
- Add automated unit tests.
- Improve accessibility and responsive design.
- Add additional security-focused validation.

## 🎯 Learning Outcomes

This project provides practical learning experience in:

- Python programming
- Flask web application development
- Frontend and backend integration
- Password security fundamentals
- Input validation and security recommendations

## 👨‍💻 Author

**Raj Maurya**

Cybersecurity Learner | Python Developer

- GitHub: [@Avicoder10](https://github.com/Avicoder10)

---

⭐ If you find this project useful for learning, consider giving the repository a star.

**Disclaimer:** This project is intended for educational purposes only.
