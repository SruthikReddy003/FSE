function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var errorMessage = document.getElementById('error-message');

  // Simple validation
  if (username === "" || password === "") {
      errorMessage.textContent = "Both fields are required!";
      return;
  }

  // Example: hard-coded validation (replace with actual logic)
  if (username === "admin" && password === "pass") {
      errorMessage.textContent = "";
      window.location.href = "home.html"; // Redirect to home page
  } else {
      errorMessage.textContent = "Invalid username or password!";
  }
}

function toggleMenu() {
  var navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show');
}

// function logout() {
//   window.location.href = "login.html"; // Redirect back to the login page
// }

// var localhost = "http://127.0.0.1:5500/FSE";

function updateLinks() {
  const links = document.querySelectorAll('a[id]'); // Get all anchor tags with IDs
  links.forEach(link => {
    const href = link.id.replace('-link', ''); // Remove '-link' from the ID
    link.href = `${href.charAt(0).toUpperCase()}${href.slice(1)}.html`; // Use relative paths
  });
}

document.addEventListener("DOMContentLoaded", updateLinks);


document.addEventListener("DOMContentLoaded", updateLinks); // Call the function once the DOM content is loaded


function confirmLogout() {
  var userConfirmed = confirm("Are you sure you want to log out?");
  if (userConfirmed) {
      window.location.href = "login.html"; // Redirect to login page
  }
}

document.getElementById('file-input').addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
      const fileURL = URL.createObjectURL(file);
      document.getElementById('pdf-preview').src = fileURL;
  }
});

