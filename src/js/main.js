import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./alert.js";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);
productList.init();

// initialize alerts
const alert = new Alert("json/alerts.json");
alert.init();

loadHeaderFooter();