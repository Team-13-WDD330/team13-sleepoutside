import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }



    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {

        const items = document.querySelector(`#summaryItems`);
        const itemTotal = document.querySelector(`#summarySubtotal`);
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        let qte_items = this.list.length;
        this.itemTotal = this.list.reduce((acc, item) => acc + item.FinalPrice, 0);
        
        itemTotal.innerText = `$${this.itemTotal.toFixed(2)}`;
        items.innerText = `${qte_items}`;
    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal * 0.06);
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`#summaryTax`);
        const shipping = document.querySelector(`#summaryShipping`);
        const orderTotal = document.querySelector(`#summaryTotal`);


        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
       
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

 }