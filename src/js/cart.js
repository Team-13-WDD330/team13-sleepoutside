import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <span class="remove" data-id="${index}">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeItem(id){
  const cartItems = getLocalStorage("so-cart");
  cartItems.splice(id, 1);
  setLocalStorage("so-cart", cartItems);
}

renderCartContents();

const removeButtons = document.querySelectorAll(".remove");
removeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    removeItem(button.dataset.id);
    location.reload();
  });
});