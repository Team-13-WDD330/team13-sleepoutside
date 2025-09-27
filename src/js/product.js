import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// create a new ProductData instance for tents
const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// render product details into the DOM
function renderProductDetails(product) {
  document.getElementById("brandName").textContent = product.Brand?.Name || "";
  document.getElementById("productName").textContent = product.Name;
  // ✅ update to use PrimaryLarge image from new API
  const productImage = document.getElementById("productImage");
  productImage.src = product.Images?.PrimaryLarge || "";
  productImage.alt = product.Name;

  document.getElementById("productPrice").textContent = `$${product.FinalPrice.toFixed(2)}`;
  document.getElementById("productColor").textContent =
    product.Colors?.[0]?.ColorName || "N/A";
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  // set product ID on Add to Cart button
  const addToCartBtn = document.getElementById("addToCart");
  addToCartBtn.dataset.id = product.Id;
}

// handle Add to Cart button
async function addToCartHandler(e) {
  const productId = e.target.dataset.id;
  if (!productId) return;

  const product = await dataSource.findProductById(productId);
  if (product) {
    addProductToCart(product);
  }
}

// initialize the page
document.addEventListener("DOMContentLoaded", async () => {
  // get product id from query string ?product=ID
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");

  if (productId) {
    const product = await dataSource.findProductById(productId);
    if (product) {
      renderProductDetails(product);
    }
  }

  // listen for add to cart
  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
});
