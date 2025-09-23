import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');

const mainElement = document.querySelector('main');

const productListHTML = `
  <section class="products">
    <h2><span class="title"></span> Products- </h2>
    <div class="sort-controls">
      <button id="sort-by-name">Sort by Name</button>
      <button id="sort-by-price">Sort by Price</button>
    </div>
    <ul class="product-list"></ul>
  </section>
`;


mainElement.insertAdjacentHTML( 'beforeend', productListHTML);


const listElement = document.querySelector('.product-list');


const dataSource = new ProductData();
const myList = new ProductList(category, dataSource, listElement);
myList.init();