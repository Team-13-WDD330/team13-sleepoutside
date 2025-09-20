import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load header & footer
loadHeaderFooter();

// Grab category from the query string
const category = getParam("category");

// Set up product list
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);
productList.init();
