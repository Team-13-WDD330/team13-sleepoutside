import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

  function addProductToCart(productItem) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(productItem);
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const productItem = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(productItem);
}

// commented this as it is duplicated in product details page, not sure which to keep

// add listener to Add to Cart button
// document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);
