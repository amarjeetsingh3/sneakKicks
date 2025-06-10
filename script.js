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

  // In initIndex(), when adding to cart
  gtag('event', 'add_to_cart', {
    item_name: name, // This maps to Product Name custom dimension
    item_price: price, // This maps to Product Price custom metric (see below)
  // ... other parameters
});
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
    // Example in updateCartCount() or initCart()
    if (typeof gtag === "function") {
      gtag('event', 'cart_status', { // or 'page_view' for cart.html
       cart_length: cart.length // This maps to Cart Item Count custom metric
});
}
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
  // Example in updateCartCount() or initCart()
if (typeof gtag === "function") {
  gtag('event', 'cart_status', { // or 'page_view' for cart.html
      cart_length: cart.length // This maps to Cart Item Count custom metric
  });
}
}
 
// NAVBAR COUNT
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
// CONTACT PAGE FORM SUBMISSION
// CONTACT PAGE FORM SUBMISSION
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the default form submission

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const inquiryCategory = document.getElementById("inquiry_category").value;
      const message = document.getElementById("message").value;
      const age = document.getElementById("age").value;
      const rating = document.getElementById("rating").value;

      // Send data to Google Analytics
      if (typeof gtag === "function") {
        gtag("event", "form_submit", {
          event_category: "Contact Form",
          event_label: inquiryCategory,
          value: rating,
          user_name: name,
          user_email: email,
          user_age: age,
          message_length: message.length,
        });
      } else {
        console.log("gtag is not defined. Google Analytics might be blocked or not loaded.");
      }

      // Provide user feedback and reset the form
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
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
 
 
