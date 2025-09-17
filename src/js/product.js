import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
const dataSource = new ProductData("tents");
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// event handler
async function addToCartHandler(e) {
  // only run if the clicked element is a button with .add-to-cart
  if (e.target && e.target.classList.contains("add-to-cart")) {
    e.preventDefault();
    e.stopPropagation();

    const productId = e.target.dataset.id;
    const product = await dataSource.findProductById(productId);
    addProductToCart(product);
  }
}

// set up event delegation
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list"); // parent container of all product cards
  if (productList) {
    productList.addEventListener("click", addToCartHandler);
  }
});