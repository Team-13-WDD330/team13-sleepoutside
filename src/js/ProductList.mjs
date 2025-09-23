import { renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

// template function
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images?.PrimaryMedium || ''}" alt="${product.Name}" loading="lazy" />
        <h2>${product.Name}</h2>
        <p class="price">$${product.FinalPrice.toFixed(2)}</p>
      </a>
      <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; 
  }

  async init() {
    // ✅ now filtered by category
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);
    this.addToCartListener(); // activate cart listener
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }

  addToCartListener() {
    this.listElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const productId = e.target.dataset.id;
        // product.Id might be a number, dataset gives string → convert
        const product = this.products.find((item) => item.Id == productId);
        if (product) {
          this.addProductToCart(product);
        }
      }
    });
  }

  addProductToCart(product) {
    const cartItems = getLocalStorage("so-cart") || [];
    const existingItem = cartItems.find((item) => item.Id == product.Id);

    if (existingItem) {
      // If product already exists, increment its quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // Clone product and assign quantity = 1
      const newProduct = { ...product, quantity: 1 };
      cartItems.push(newProduct);
    }

    setLocalStorage("so-cart", cartItems);
  }
}