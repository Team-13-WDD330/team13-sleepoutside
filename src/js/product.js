import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let so_cart = JSON.parse(localStorage.getItem("so-cart"));

  // Se não for um array, inicializa como um array vazio
  if (!Array.isArray(so_cart)) {
    so_cart = [];
  }

  so_cart.push(product);
  localStorage.setItem("so-cart", JSON.stringify(so_cart));
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
