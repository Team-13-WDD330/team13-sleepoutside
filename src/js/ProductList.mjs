import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.originalList = []; // Store the original unsorted list
  }

  async init() {
    this.originalList = await this.dataSource.getData(this.category);
    this.renderList(this.originalList);
    document.querySelector(".title").textContent = this.category;

    // Add event listeners for sorting buttons Mateus Nunes Individual Assignment
    const sortByNameButton = document.querySelector("#sort-by-name");
    const sortByPriceButton = document.querySelector("#sort-by-price");

    if (sortByNameButton) {
      sortByNameButton.addEventListener("click", () => this.sortList("name"));
    }
    if (sortByPriceButton) {
      sortByPriceButton.addEventListener("click", () => this.sortList("price"));
    }
  }

  sortList(sortKey) {
    let sortedList = [...this.originalList]; // Create a copy to sort

    if (sortKey === "name") {
      sortedList.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
    } else if (sortKey === "price") {
      sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }

    this.renderList(sortedList);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}