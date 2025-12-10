// Cart Management
const cart = JSON.parse(localStorage.getItem("cart")) || []

function updateCartUI() {
  const cartCounts = document.querySelectorAll(".cart-count")
  cartCounts.forEach((el) => {
    el.textContent = cart.length
  })

  const cartList = document.getElementById("cart-list")
  const emptyCart = document.getElementById("cart-empty")

  if (cart.length === 0) {
    if (cartList) cartList.style.display = "none"
    if (emptyCart) emptyCart.style.display = "block"
  } else {
    if (cartList) {
      cartList.style.display = "block"
      cartList.innerHTML = cart
        .map(
          (item, index) => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="/images/shop/${index + 1}.jpg" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>¢${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-remove">
                        <button onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `,
        )
        .join("")
    }
    if (emptyCart) emptyCart.style.display = "none"
  }

  updateOrderSummary()
}

function addToCart(name, price) {
  cart.push({ name, price })
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartUI()

  // Show feedback
  alert(`${name} added to cart!`)
}

function removeFromCart(index) {
  cart.splice(index, 1)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartUI()
}

function updateOrderSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0)
  const tax = subtotal * 0.1
  const shipping = cart.length > 0 ? 10 : 0
  const total = subtotal + tax + shipping

  document.getElementById("subtotal").textContent = "¢" + subtotal.toFixed(2)
  document.getElementById("tax").textContent = "¢" + tax.toFixed(2)
  document.getElementById("shipping").textContent = "¢" + shipping.toFixed(2)
  document.getElementById("total").textContent = "¢" + total.toFixed(2)
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }
  alert("Proceeding to checkout... (Demo)")
}

function handleNewsletter(event) {
  event.preventDefault()
  const email = event.target.querySelector('input[type="email"]').value
  alert(`Thank you for subscribing with ${email}!`)
  event.target.reset()
}

function handleContactForm(event) {
  event.preventDefault()
  alert("Thank you for your message! We will get back to you soon.")
  event.target.reset()
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", updateCartUI)

// Update price filter
const priceRange = document.getElementById("price-range")
if (priceRange) {
  priceRange.addEventListener("input", (e) => {
    document.getElementById("price-value").textContent = e.target.value
  })
}


