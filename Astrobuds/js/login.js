//---------- login logic ---------------

var log = document.getElementById("login");
var reg = document.getElementById("register");
var button = document.getElementById("btn");
var titleTxt = document.getElementById("txt");

function register() {
  log.style.left = "-400px";
  reg.style.left = "50px";
  button.style.left = "110px";
  titleTxt.innerText = "Registrarse";
}

function login() {
  log.style.left = "50px";
  reg.style.left = "450px";
  button.style.left = "0";
  titleTxt.innerText = "Iniciar Sesión";
}

const form = document.getElementById("login");
const form2 = document.getElementById("register");

form2.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = form2.user2.value;
  const correo = form2.correo.value;
  const pass = form2.pass2.value;

  if (user !== "" && correo !== "" && pass !== "") {
    Swal.fire({
      icon: "success",
      iconColor: "green",
      title: "Registro Exitoso",
      text: "Cuenta creada con exito",
      confirmButtonColor: "#28a745",
    });
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = form.user.value;
  const pass = form.pass.value;

  const verad = vera(user, pass);

  if (verad) {
    localStorage.setItem("isLoggedIn", "true");
    console.log(localStorage);
    window.location.replace("home.html");
  } else {
    Swal.fire({
      title: "¡ERROR!",
      icon: "warning",
      iconColor: "red",
      html: "Usuario o Contraseña incorrectos.",
      confirmButtonColor: "#dc3545",
    });
  }
});

//------ checking user & password

function vera(user, pass) {
  if (user === "alumno" && pass === "2023") {
    return true;
  } else {
    return false;
  }
}

//---- IF  register , moves back to the home------------
document.addEventListener("DOMContentLoaded", function () {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn || isLoggedIn !== "false") {
    window.location.replace("home.html");
  }
});
