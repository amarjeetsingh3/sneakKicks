// script.js
 
let cart = JSON.parse(localStorage.getItem("sneakCart")) || [];
 
function saveCart() {
  localStorage.setItem("sneakCart", JSON.stringify(cart));
}
 
// INDEX PAGE
function initIndex() {
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
 
      cart.push({ name, price });
      saveCart();
 
      alert(`${name} added to cart!`);
      updateCartCount(); // Optional: live count on navbar
    });
  });
 
  updateCartCount();
}
 
// CART PAGE
function initCart() {
  const cartList = document.getElementById("cart-list");
  const total = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout-btn");
 
  function updateCartDisplay() {
    cartList.innerHTML = "";
    let sum = 0;
 
    if (cart.length === 0) {
      cartList.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
          ${item.name} - ₹${item.price.toFixed(2)}
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartList.appendChild(li);
        sum += item.price;
      });
    }
 
    total.textContent = `₹${sum.toFixed(2)}`;
    updateCartCount();
  }
 
  // Event delegation for remove buttons
  cartList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      cart.splice(index, 1);
      saveCart();
      updateCartDisplay();
    }
  });
 
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
 
    alert("Thank you for your purchase!");
    cart = [];
    saveCart();
    updateCartDisplay();
  });
 
  updateCartDisplay();
}
 
// NAVBAR COUNT
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
 
window.onload = () => {
  if (document.querySelectorAll(".add-to-cart").length > 0) {
    initIndex();
  }
  if (document.getElementById("cart-list")) {
    initCart();
  }
};
 