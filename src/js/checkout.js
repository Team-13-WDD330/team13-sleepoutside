import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();


const order = new CheckoutProcess("so-cart", "order-summary");

order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
    .querySelector("#zip")
    .addEventListener("blur", order.calculateOrderTotal.bind(order));



document.getElementById('checkoutForm').addEventListener('submit', function (e) {
    const inputs = this.querySelectorAll('input');
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert('Please fill out all fields before submitting.');
            e.preventDefault();
            return;
        }
    }
});


