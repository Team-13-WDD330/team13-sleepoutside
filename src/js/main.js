import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./alert.js";
import { loadHeaderFooter, getLocalStorage } from "./utils.mjs"; /* getLocalStorage for counting items in cart - MN assigment */

// Category hardcoded to "tents" for home page Top Products
const category = "tents";
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);
productList.init();

// initialize alerts
const alert = new Alert("json/alerts.json");
alert.init();

/* MN assigment - cart item count */
function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const count = cartItems.length;
  const cartCountElem = document.querySelector(".cart-count");
  if (cartCountElem) {
    cartCountElem.textContent = count;
    cartCountElem.style.display = count > 0 ? "inline" : "none";
  }
}

updateCartCount();

loadHeaderFooter();

console.log("BaseURL from env:", import.meta.env.VITE_SERVER_URL);