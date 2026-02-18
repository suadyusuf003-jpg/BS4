document.addEventListener("DOMContentLoaded", function () {
  console.log("Main.js loaded successfully 🚀");

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("token");
      alert("Logged out ✅");
    });
  }

  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      alert(`Logged in as ${email}`);
      // Hide login section after login
      document.getElementById("login-section").style.display = "none";
    });
  }
});