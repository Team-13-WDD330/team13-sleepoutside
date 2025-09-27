import {
    getLocalStorage, setLocalStorage, alertMessage,
    removeAllAlerts
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    // convert the form data to a JSON object
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process.
    // An Array.map would be perfect for this process.
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.Quantity || 1,
        };
    });
    return simplifiedItems;

}


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
        // Total of items, considering quantity
        this.qty_items = this.list.reduce((acc, item) => acc + (item.Quantity || 1), 0);
        // Total price of items
        this.itemTotal = this.list.reduce((acc, item) => acc + item.FinalPrice * (item.Quantity || 1), 0);

        itemTotal.innerText = `$${this.itemTotal.toFixed(2)}`;
        items.innerText = `${this.qty_items}`;
    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal * 0.06);
        this.shipping = 10 + (this.qty_items - 1) * 2;
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping));

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

    async checkout() {
        // get the form element data by the form name
        // convert the form data to a JSON order object using the formDataToJSON function
        // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
        // call the checkout method in the ExternalServices module and send it the JSON order data.
        const formElement = document.forms["checkoutForm"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        console.log(order);

        try {
            const response = await services.checkout(order);
            console.log(response);
            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html");
        } catch (err) {
            // get rid of any preexisting alerts.
            removeAllAlerts();
            for (let message in err.message) {
                alertMessage(err.message[message]);
            }
            console.log(err);
        }
    }
}


