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
      <button class="quick-view" data-id="${product.Id}">Quick View</button>
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
    this.addEventListeners(); // ✅ handles both cart + quick view
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

  addEventListeners() {
    this.listElement.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;

      // Add to cart
      if (e.target.classList.contains("add-to-cart")) {
        const product = this.products.find((item) => item.Id == productId);
        if (product) this.addProductToCart(product);
      }

      // Quick view
      if (e.target.classList.contains("quick-view")) {
        const product = this.products.find((item) => item.Id == productId);
        if (product) this.openQuickView(product);
      }
    });
  }

  addProductToCart(product) {
    const cartItems = getLocalStorage("so-cart") || [];
    const existingItem = cartItems.find((item) => item.Id == product.Id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      const newProduct = { ...product, quantity: 1 };
      cartItems.push(newProduct);
    }

    setLocalStorage("so-cart", cartItems);
  }

  openQuickView(product) {
    const modal = document.getElementById("quickViewModal");
    const modalBody = modal.querySelector(".modal-body");

    modalBody.innerHTML = `
      <h2>${product.Name}</h2>
      <img src="${product.Images?.PrimaryLarge || ''}" alt="${product.Name}" />
      <p>${product.DescriptionHtmlSimple || "No description available."}</p>
      <p><strong>Price:</strong> $${product.FinalPrice.toFixed(2)}</p>
    `;

    modal.classList.add("open");

    // Close button
    modal.querySelector(".close").addEventListener("click", () => {
      modal.classList.remove("open");
    });

    // Close when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }
}
