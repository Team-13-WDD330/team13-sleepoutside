function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/product1.html"> 
        <img src="" alt="Image of ">
        <h2 class="card_brand"></h2>
        <h3 class="card_name"></h3>
        <p class="product_card_price"></p>
        </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    //this.productData = new ProductData(); this was not in the sample solution
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list); // I did not had this before, it was in the sample solution
  }

  renderList(products) {
    //const html = products.map(product => productCardTemplate(product)).join("");
    //this.listElement.insertAdjacentHTML('afterbegin', html.join);
    // sample solution suggested to use the code below and had the code above commented out
    
    renderListWithTemplate(productCardTemplate, this.listElement, products);
  }
}