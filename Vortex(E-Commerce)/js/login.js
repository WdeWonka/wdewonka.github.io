const showPassword = document.getElementById("show-password");
const passwordField = document.querySelector("#password");

showPassword.addEventListener("click", function () {
  const currentIcon = showPassword.getAttribute("icon");

  if (currentIcon === "mdi:eye-off") {
    showPassword.setAttribute("icon", "mdi:eye-outline");
  } else {
    showPassword.setAttribute("icon", "mdi:eye-off");
  }

  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";

  passwordField.setAttribute("type", type);
});
