import products from "./data.js";

const productCard = document.querySelector(".product-grid");
const cartCard = document.querySelector(".full-cart");
const total = document.querySelector(".total-price");
const filterBtns = document.querySelector(".filter-btns");
const title = document.querySelector(".title-home h3");

let listCarts = [];
let displayedProducts = products;

const updateProductDisplay = () => {
  productCard.innerHTML = "";
  displayedProducts.forEach((value) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("product-card");
    newDiv.innerHTML = `
      <div class="product-header">
        <img src="${value.image}" alt="" />
      </div>
      <div class="product-details">
          <p>${value.productName}</p>
          <p class="item-price">Q ${value.price.toLocaleString()}</p>
        <div class="cart-btn">
            <button class="add-to-cart-button" data-key="${value.id}">
            <iconify-icon icon="ph:plus-bold"></iconify-icon>
            </button>
        </div>
      </div>
    `;
    productCard.appendChild(newDiv);
  });

  const addToCartBtns = document.querySelectorAll(".add-to-cart-button");
  addToCartBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      const key = event.target.dataset.key;
      addToCart(key);
    });
  });
};

const updateDisplayedProductsByCategory = (category) => {
  if (category === "Todo") {
    title.textContent = "Todo";
    displayedProducts = products;
  } else {
    title.textContent = category;
    displayedProducts = products.filter((data) => data.category === category);
  }
  updateProductDisplay();
};

const initFilt = () => {
  updateProductDisplay();

  // DISPLAYED CATEGORY BUTTONS / ADD NEW ONE ON THE DATA.js
  const categories = products.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["Todo"]
  );

  const categoryBtns = categories
    .map((category) => {
      return `<a href="#"><button data-id="${category}">${category}</button></a>`;
    })
    .join("");

  filterBtns.innerHTML = categoryBtns;

  const categoryButtons = document.querySelectorAll(".filter-btns button");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.dataset.id;
      updateDisplayedProductsByCategory(category);
    });
  });
};

initFilt();

const addToCart = (key) => {
  console.log("Adding to cart - key:", key);

  if (listCarts[key] == null) {
    listCarts[key] = JSON.parse(JSON.stringify(products[key]));
    listCarts[key].quantity = 1;
    updateTotalPrice();
    reloadCard();
  }
};

let totalPrice = 0;

const updateTotalPrice = () => {
  totalPrice = 0;
  listCarts.forEach((value) => {
    if (value != null) {
      totalPrice += value.price * value.quantity;
    }
  });
};

const reloadCard = () => {
  cartCard.innerHTML = "";

  listCarts.forEach((value) => {
    if (value != null) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("cart-item");
      newDiv.innerHTML = `
        <div class="cart-img">
          <img src="${value.image}" alt="product" />
        </div>
        <div class="cart-middle">
          <p class="cart-name">${value.productName}</p>
          <div class="cart-btns">
            <button >-</button>
            <p class="quantity">${value.quantity}</p>
            <button >+</button>
          </div>
        </div>
        <div class="cart-right">
          <p class="cart-price">Q ${value.price.toLocaleString()}</p>
          <div  data-key="${value.id}" class="bx bx-x"></div>
        </div>
      `;

      newDiv
        .querySelector(".cart-btns button:first-child")
        .addEventListener("click", () => {
          if (value.quantity > 1) {
            value.quantity--;
            updateTotalPrice();
            reloadCard();
          }
        });

      newDiv
        .querySelector(".cart-btns button:last-child")
        .addEventListener("click", () => {
          if (value.quantity >= 0) {
            value.quantity++;
            updateTotalPrice();
            reloadCard();
          }
        });

      newDiv.querySelector(".bx").addEventListener("click", () => {
        removeFromCart(value.id);
        updateTotalPrice();
      });

      cartCard.appendChild(newDiv);
    }
  });

  total.innerText = totalPrice.toLocaleString();
};

const removeFromCart = (key) => {
  if (listCarts[key] != null) {
    totalPrice -= listCarts[key].price * listCarts[key].quantity;
    listCarts[key] = null;
    reloadCard();
  }
};
