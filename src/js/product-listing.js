import ProductData from './ProductData.js';
import ProductList from './ProductList.js';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');

// Get the main element where content will be rendered
const mainElement = document.querySelector('main');

// Create the product list section with sort controls
const productListHTML = `
  <section class="products">
    <h2><span class="title"></span> Products</h2>
    <div class="sort-controls">
      <button id="sort-by-name">Sort by Name</button>
      <button id="sort-by-price">Sort by Price</button>
    </div>
    <ul class="product-list"></ul>
  </section>
`;

// Insert the product list HTML into the main element
mainElement.insertAdjacentHTML('beforeend', productListHTML);

// First, create an instance of the ProductData class.
const dataSource = new ProductData();
// Then get the element you want the product list to render in
const listElement = document.querySelector('.product-list');
// Then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// Finally call the init method to show the products
myList.init();