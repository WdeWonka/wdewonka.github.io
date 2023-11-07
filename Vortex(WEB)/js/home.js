import products from "./data.js";

const productCard = document.querySelector(".product-grid");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const displayProductCards = () => {
  productCard.innerHTML = "";
  const productsToDisplay = products.slice(0, 8);

  shuffleArray(productsToDisplay);

  productsToDisplay.forEach((value) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("product-card");
    newDiv.innerHTML = `
      <div class="product-header">
        <a href="tienda.html"><img src="${value.image}" alt="" /></a>
      </div>
      <div class="product-details">
        <a href="tienda.html"><p>${value.productName}</p></a>
        <a href="tienda.html"><p class="item-price">Q ${value.price.toLocaleString()}</p></a>
      </div>
    `;
    productCard.appendChild(newDiv);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  displayProductCards();
});
