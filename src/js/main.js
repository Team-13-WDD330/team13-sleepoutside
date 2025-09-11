import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const ProductData = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const ProductList = new ProductList(category, dataSource, listElement);
productList.init();