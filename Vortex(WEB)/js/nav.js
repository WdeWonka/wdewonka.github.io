const header = document.querySelector("header");

const createNav = () => {
  header.innerHTML = `
  <a href="index.html" class="logo">
  <img src="assets/images/vortex-2.0.png" class="logo" alt="vortex" />
</a>

<ul class="navlist">
  <li class="active"><a href="index.html">Home</a></li>
  <li><a href="tienda.html">Tienda</a></li>
  <li><a href="nosotros.html">Nosotros</a></li>
  <li><a href="contacto.html">Contacto</a></li>
</ul>

<div class="header-icons">
  <a href="login.html"
    ><iconify-icon icon="ph:user-bold"></iconify-icon
  ></a>
  <iconify-icon id="cart-icon" icon="ion:cart-sharp"></iconify-icon>
  <div id="menu-icon" class="bx bx-menu"></div>
</div>`;
};

createNav();

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 0);
});

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
  navlist.classList.toggle("open");
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !navlist.contains(e.target)) {
    navlist.classList.remove("open");
  }
});

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navlist.classList.remove("open");
};
