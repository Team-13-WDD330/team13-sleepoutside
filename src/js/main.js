import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./alert.js";
import { loadHeaderFooter } from "./utils.mjs";

// Category hardcoded to "tents" for home page Top Products
const category = "tents";
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);
productList.init();

// initialize alerts
const alert = new Alert("json/alerts.json");
alert.init();

loadHeaderFooter();

console.log("BaseURL from env:", import.meta.env.VITE_SERVER_URL);