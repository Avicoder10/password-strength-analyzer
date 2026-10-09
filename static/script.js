const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");
const scoreElement = document.getElementById("score");
const entropyValue = document.getElementById("entropyValue");

const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCheck = document.getElementById("specialCheck");
const commonCheck = document.getElementById("commonCheck");

const suggestionList = document.getElementById("suggestionList");


// Show / Hide Password
togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }

});


// Analyze password using Flask Backend
passwordInput.addEventListener("input", async function () {

    const password = passwordInput.value;

    if (password.length === 0) {
        resetAnalyzer();
        return;
    }

    try {

        const response = await fetch("/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                password: password
            })

        });

        const result = await response.json();

        updateAnalyzer(result);

    } catch (error) {

        console.error("Backend error:", error);

        strengthText.textContent = "ERROR";

    }

});


// Update UI with backend result
function updateAnalyzer(result) {

    strengthText.textContent = result.strength;

    scoreElement.textContent = result.score;

    entropyValue.textContent = result.entropy_bits ?? 0;

    const percentage =
        (result.score / result.max_score) * 100;

    strengthBar.style.width = percentage + "%";
    if (result.strength === "WEAK") {
    strengthBar.style.backgroundColor = "#ef4444";
    strengthText.style.color = "#ef4444";
}
else if (result.strength === "MEDIUM") {
    strengthBar.style.backgroundColor = "#f97316";
    strengthText.style.color = "#f97316";
}
else if (result.strength === "STRONG") {
    strengthBar.style.backgroundColor = "#22c55e";
    strengthText.style.color = "#22c55e";
}
else if (result.strength === "VERY STRONG") {
    strengthBar.style.backgroundColor = "#3b82f6";
    strengthText.style.color = "#3b82f6";
}


    // Update checks
    result.checks.forEach(function (check) {

        const name = check.name;

        const icon = check.passed ? "✅" : "❌";

        if (name.includes("12") || name.includes("8")) {
            lengthCheck.textContent =
                icon + " " + name;
        }

        else if (name.includes("Uppercase")) {
            uppercaseCheck.textContent =
                icon + " Uppercase letter";
        }

        else if (name.includes("Lowercase")) {
            lowercaseCheck.textContent =
                icon + " Lowercase letter";
        }

        else if (name.includes("Number")) {
            numberCheck.textContent =
                icon + " Number";
        }

        else if (name.includes("Special")) {
            specialCheck.textContent =
                icon + " Special character";
        }

        else if (name.includes("common")) {
            commonCheck.textContent =
                icon + " Not a common password";
        }

    });


    // Suggestions
    suggestionList.innerHTML = "";

    if (result.suggestions.length === 0) {

        const li = document.createElement("li");

        li.textContent =
            "Excellent! Your password satisfies all security checks.";

        suggestionList.appendChild(li);

    } else {

        result.suggestions.forEach(function (suggestion) {

            const li = document.createElement("li");

            li.textContent = suggestion;

            suggestionList.appendChild(li);

        });

    }

}


// Reset analyzer
function resetAnalyzer() {

    strengthText.textContent = "—";

    scoreElement.textContent = "0";

    entropyValue.textContent = "0";

    strengthBar.style.width = "0%";

    lengthCheck.textContent =
        "❌ At least 8 characters";

    uppercaseCheck.textContent =
        "❌ Uppercase letter";

    lowercaseCheck.textContent =
        "❌ Lowercase letter";

    numberCheck.textContent =
        "❌ Number";

    specialCheck.textContent =
        "❌ Special character";

    commonCheck.textContent =
        "❌ Not a common password";

    suggestionList.innerHTML =
        "<li>Enter a password to start the analysis.</li>";

}

const copyReportButton = document.getElementById("copyReport");
const copyStatus = document.getElementById("copyStatus");

copyReportButton.addEventListener("click", async function () {
    const password = passwordInput.value;

    if (!password) {
        copyStatus.textContent = "Please enter a test password first.";
        return;
    }

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: password })
        });

        if (!response.ok) {
            throw new Error("Analysis request failed");
        }

        const result = await response.json();

        const report = [
            "PASSWORD SECURITY REPORT",
            "------------------------",
            `Strength: ${result.strength}`,
            `Score: ${result.score}/${result.max_score}`,
            `Estimated entropy: ${result.entropy_bits} bits`,
            "",
            "Security checks:",
            ...result.checks.map(
                check => `${check.passed ? "PASS" : "FAIL"}: ${check.name}`
            ),
            "",
            "Suggestions:",
            ...(result.suggestions.length
                ? result.suggestions.map(item => `- ${item}`)
                : ["No suggestions"])
        ].join("\n");

        await navigator.clipboard.writeText(report);

        copyStatus.textContent = "Security report copied successfully!";

    } catch (error) {
        copyStatus.textContent =
            "Could not copy report. Use localhost and allow clipboard access.";
        console.error(error);
    }
});
