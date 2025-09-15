import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(location.search);
  const productId = params.get("product");
  if (!productId) return;

  const product = await dataSource.findProductById(productId);


function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
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

//Individual activity: Add a visual indicator of the amount of the discount on the product.
//Computes the discount of the product
function getDiscountAmount(product){
  const regularPrice = product.regularPrice;
  const finalPrice = product.finalPrice;

  const discount = Number(regularPrice) - Number(finalPrice);
  
  if (discount > 0){
    const percentOff = Math.round((discount/regularPrice)* 100)
    return percentOff;
  }
  else{
    return 0;
  }
}

 //render discount
function renderDiscount(product){
  const productDiscount = document.getElementById("product_discount");
  const percentOff = getDiscountAmount(product)
  if ( percentOff > 0){
    productDiscount.textContent = ` ${percentOff}% OFF`
    productDiscount.hidden = false;
  } else {
    productDiscount.hidden = true;
  }
 }   

renderDiscount();
console.log(renderDiscount);
})