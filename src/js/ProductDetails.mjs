import { getLocalStorage, setLocalStorage, alertMessage,
    removeAllAlerts } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    removeAllAlerts();
    alertMessage(`${this.product.NameWithoutBrand} was added to cart!`);
  }

  renderProductDetails(selector) {

    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  
  }
}

function productDetailsTemplate(product) {

  return `<section class="product-detail"> 
      <h2 class="divider" id="p-name">${product.NameWithoutBrand}</h2>
      <figure>
      <img
        class="divider"
        src="${product.Images.PrimaryExtraLarge}"
        alt="${product.NameWithoutBrand}"
      />
      </figure>

      <section id="product-info">
      <h3 id="p-brand">${product.Brand.Name}</h3>
       <p id="p_color">${product.Colors[0].ColorName}</p>
            <p class="product__description" id="p-description">
      ${product.DescriptionHtmlSimple}
      </p>  
      <p class="product-card__price" id="p-price">$${product.FinalPrice}</p>
     
 
      <div class="product-detail__add">
        <button id="add-to-cart" data-id="${product.Id}">Add to Cart</button>
      </div>
      </section>
      </section>`;


  // ************* Alternative Display Product Details Method *******************
  // function productDetailsTemplate(product) {
  //   document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  //   document.querySelector("#p-brand").textContent = product.Brand.Name;
  //   document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  //   const productImage = document.querySelector("#p-image");
  //   productImage.src = product.Images.PrimaryExtraLarge;
  //   productImage.alt = product.NameWithoutBrand;
  //   const euroPrice = new Intl.NumberFormat('de-DE',
  //     {
  //       style: 'currency', currency: 'USD',
  //     }).format(Number(product.FinalPrice) * 0.85);
  //   document.querySelector("#p-price").textContent = `${euroPrice}`;
  //   document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  //   document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  //   document.querySelector("#add-to-cart").dataset.id = product.Id;
  // }
}