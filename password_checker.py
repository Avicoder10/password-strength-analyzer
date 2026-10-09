import re
from pathlib import Path
import math


COMMON_PASSWORD_FILE = Path(__file__).parent / "common_passwords.txt"


def load_common_passwords():
    if not COMMON_PASSWORD_FILE.exists():
        return set()

    with open(COMMON_PASSWORD_FILE, "r", encoding="utf-8") as file:
        return {
            line.strip().lower()
            for line in file
            if line.strip()
        }

def calculate_entropy(password):
    if not password:
        return 0

    pool_size = 0

    if re.search(r"[a-z]", password):
        pool_size += 26

    if re.search(r"[A-Z]", password):
        pool_size += 26

    if re.search(r"[0-9]", password):
        pool_size += 10

    if re.search(r"[^A-Za-z0-9]", password):
        pool_size += 33

    if pool_size == 0:
        return 0

    entropy = len(password) * math.log2(pool_size)

    return round(entropy, 2)

def check_password(password):
    score = 0
    checks = []
    suggestions = []

    common_passwords = load_common_passwords()

    # Common password check
    is_common = password.lower() in common_passwords

    if is_common:
        suggestions.append(
            "This is a commonly used password. Choose a unique password."
        )
    else:
        score += 1

    checks.append({
        "name": "Not a common password",
        "passed": not is_common
    })

    # Length
    if len(password) >= 12:
        score += 2
        checks.append({
            "name": "At least 12 characters",
            "passed": True
        })
    elif len(password) >= 8:
        score += 1
        checks.append({
            "name": "At least 8 characters",
            "passed": True
        })
        suggestions.append(
            "Use 12 or more characters for better security."
        )
    else:
        checks.append({
            "name": "At least 8 characters",
            "passed": False
        })
        suggestions.append(
            "Use at least 8 characters."
        )

    # Uppercase
    if re.search(r"[A-Z]", password):
        score += 1
        checks.append({
            "name": "Uppercase letter",
            "passed": True
        })
    else:
        checks.append({
            "name": "Uppercase letter",
            "passed": False
        })
        suggestions.append(
            "Add at least one uppercase letter."
        )

    # Lowercase
    if re.search(r"[a-z]", password):
        score += 1
        checks.append({
            "name": "Lowercase letter",
            "passed": True
        })
    else:
        checks.append({
            "name": "Lowercase letter",
            "passed": False
        })
        suggestions.append(
            "Add at least one lowercase letter."
        )

    # Number
    if re.search(r"[0-9]", password):
        score += 1
        checks.append({
            "name": "Number",
            "passed": True
        })
    else:
        checks.append({
            "name": "Number",
            "passed": False
        })
        suggestions.append(
            "Add at least one number."
        )

    # Special character
    if re.search(r"[^A-Za-z0-9]", password):
        score += 1
        checks.append({
            "name": "Special character",
            "passed": True
        })
    else:
        checks.append({
            "name": "Special character",
            "passed": False
        })
        suggestions.append(
            "Add at least one special character."
        )

    # Strength
    if is_common:
        strength = "WEAK"
    elif len(password) < 8 or score <= 2:
        strength = "WEAK"
    elif score <= 4:
        strength = "MEDIUM"
    elif score <= 6:
        strength = "STRONG"
    else:
        strength = "VERY STRONG"


    return {
        "score": score,
        "max_score": 8,
        "strength": strength,
        "checks": checks,
        "suggestions": suggestions,
        "entropy_bits": calculate_entropy(password)
}

if __name__ == "__main__":

    password = input("Enter password: ")

    result = check_password(password)

    print("\n--- Password Security Report ---")
    print("Strength:", result["strength"])
    print("Score:", result["score"], "/", result["max_score"])

    print("\nChecks:")

    for check in result["checks"]:
        status = "PASS" if check["passed"] else "FAIL"
        print(f"[{status}] {check['name']}")

    if result["suggestions"]:
        print("\nSuggestions:")

        for suggestion in result["suggestions"]:
            print("-", suggestion)