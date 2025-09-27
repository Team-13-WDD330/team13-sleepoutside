import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
<!--
  <p class="cart-card__quantity">qty: 1</p>
    -->
  <label>qty: <input type="number" name="qty" value="${item.Quantity}" min="1" required ></label>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {

  constructor(cartItems, listElement, totalCart) {
    this.cartItems = cartItems;
    this.listElement = listElement;
    this.totalCart = totalCart;

  }

  async init() {

    this.renderCartContents();

  }

  renderCartContents() {

    if (!this.cartItems || this.cartItems.length === 0) {
      this.listElement.innerHTML = "<li><p>Your cart is empty!</p></li>";
    } else {
      renderListWithTemplate(cartItemTemplate, this.listElement, this.cartItems);

      // Function to calculate and update total
      const updateTotal = () => {
        const total = this.cartItems.reduce(
          (acc, item) => acc + item.FinalPrice * (item.Quantity || 1), 0
        );
        this.totalCart.innerHTML = `Total: $${total.toFixed(2)}`;
      };

      updateTotal();
      document.querySelector(".cart-footer").classList.remove("hide");

      // Update quantities and total when input changes
      const qtyInputs = this.listElement.querySelectorAll('input[type="number"][name="qty"]');
      qtyInputs.forEach((input, idx) => {
        input.addEventListener('input', () => {
          let value = parseInt(input.value, 10);
          if (!value || value < 1) value = 1;
          input.value = value;
          this.cartItems[idx].Quantity = value;
          localStorage.setItem("so-cart", JSON.stringify(this.cartItems));
          updateTotal();
        });
      });
    }


  }
}


