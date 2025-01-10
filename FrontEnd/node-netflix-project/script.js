const inputs = document.querySelectorAll(".form-input");
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.transform = "scale(1.05)";
    input.style.transition = "transform 0.3s ease";
  });

  input.addEventListener("blur", () => {
    input.style.transform = "scale(1)";
  });
});

const loginButton = document.querySelector(".login-button");
loginButton.addEventListener("mouseover", () => {
  loginButton.style.animation = "bounce 0.5s ease";
});

loginButton.addEventListener("animationend", () => {
  loginButton.style.animation = "";
});

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("mouseover", () => {
    link.style.position = "relative";
    link.style.color = "#e50914";
  });

  link.addEventListener("mouseout", () => {
    link.style.position = "initial";
    link.style.color = "#fff";
  });
});

const loginBox = document.querySelector(".login-box");
window.addEventListener("load", () => {
  loginBox.style.opacity = "0";
  loginBox.style.transition = "opacity 1s ease";
  loginBox.style.opacity = "1";
});
