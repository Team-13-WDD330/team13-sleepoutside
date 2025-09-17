import { renderListWithTemplate } from "./utils.mjs";

// template function
function productCardTemplate(product) {
  // Check for discount
  let discountHTML = "";
  if (
    product.SuggestedRetailPrice &&
    product.FinalPrice < product.SuggestedRetailPrice
  ) {
    const discountPercent = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
    );
    discountHTML = `
      <span class="discount-flag">-${discountPercent}% OFF</span>
      <span class="old-price">$${product.SuggestedRetailPrice}</span>
    `;
  }

  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}" />
        <h2>${product.Name}</h2>
        <p>${product.DescriptionHtmlSimple}</p>
        <p class="price">
          $${product.FinalPrice}
          ${discountHTML}
        </p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
