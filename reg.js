document.getElementById("regForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("fullname").value.trim();
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value.trim();

    let valid = true;

    // Clear errors
    document.getElementById("nameErr").textContent = "";
    document.getElementById("emailErr").textContent = "";
    document.getElementById("passErr").textContent = "";

    // Validation
    if (name.length < 3) {
        document.getElementById("nameErr").textContent = "Name must be at least 3 characters";
        valid = false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("emailErr").textContent = "Enter valid email";
        valid = false;
    }

    if (pass.length < 6) {
        document.getElementById("passErr").textContent = "Password must be 6+ characters";
        valid = false;
    }

    if (!valid) return;

    // Save user
    localStorage.setItem("user", JSON.stringify({ name, email }));

    // First login → go to homepage
    window.location.href = "food.html";
});
