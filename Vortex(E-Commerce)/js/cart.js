import products from "./data.js";

const cartIcon = document.getElementById("cart-icon");
const cartX = document.getElementById("cart-x");
const cartStatus = document.querySelector(".cart-div");
const overlay = document.querySelector(".page-overlay");

cartIcon.onclick = () => {
  if (cartStatus.classList.contains("closed-cart")) {
    cartStatus.classList.remove("closed-cart");
    cartStatus.classList.add("open-cart");

    //IN PROGRESS.... ISSUES WITH THE OVERLAY DISPLAY
    // if (overlay.classList.contains("closed-flex")) {
    //   overlay.classList.remove("closed-flex");
    //   overlay.classList.add("open-flex");
    // }
  }
};

cartX.onclick = () => {
  cartStatus.classList.remove("open-cart");
  cartStatus.classList.add("closed-cart");

  // overlay.classList.remove("open-flex");
  // overlay.classList.add("closed-flex");
};
