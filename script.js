console.log("EMARKET SCRIPT LOADED ✅");

/* =========================
   SAFE HELPERS
========================= */

function getEl(id) {
  return document.getElementById(id);
}

/* =========================
   BUY SYSTEM
========================= */

function buyProduct(productName, productPrice) {

const user =
JSON.parse(
localStorage.getItem("loggedInUser")
);

if(!user){

alert("Please login first");

window.location.href =
"register.html";

return;

}

/* SAVE CURRENT ORDER */

const order = {

product: productName,

price: productPrice,

buyer: user.name,

date: new Date().toLocaleString(),

orderId:
"EM" +
Math.floor(Math.random()*999999)

};

localStorage.setItem(
"currentOrder",
JSON.stringify(order)
);

/* GO PAYMENT */

window.location.href =
"checkout.html";

}

/* =========================
   ADD TO CART
========================= */

function addToCart(
productName,
productPrice,
productImage
){

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const existing =
cart.find(item =>

item.name === productName

);

if(existing){

existing.qty += 1;

}else{

cart.push({

name: productName,

price: Number(productPrice),

image: productImage,

qty: 1

});

}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCount();

alert(
productName +
" added to cart 🛒"
);

}

/* =========================
   USER REGISTER
========================= */
function registerUser() {
  const name = getEl("name")?.value;
  const surname = getEl("surname")?.value;
  const email = getEl("email")?.value;
  const password = getEl("password")?.value;

  if (!name || !surname || !email || !password) {
    alert("Fill all fields");
    return;
  }

  const user = { name, surname, email, password };

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Registration successful ✅");
  window.location.href = "index.html";
}

/* =========================
   USER LOGIN
========================= */
function loginUser() {
  const email = getEl("loginEmail")?.value;
  const password = getEl("loginPassword")?.value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No account found");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
    alert("Login successful ✅");
    window.location.href = "index.html";
  } else {
    alert("Invalid login");
  }
}

/* =========================
   SHOW USER
========================= */
function showUser() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const nav = document.querySelector(".nav-links");
  if (!nav) return;

  if (user) {
    nav.innerHTML = `
      <span style="margin-right:10px;">👋 ${user.name}</span>
      <a href="#" onclick="logout()">Logout</a>
    `;
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

/* =========================
   SELLER SYSTEM (SAFE PLACEHOLDER)
========================= */
function registerSeller() {
  const name = getEl("sName")?.value;
  const shopName = getEl("shopName")?.value;
  const residence = getEl("residence")?.value;
  const nationalId = getEl("nationalId")?.value;
  const category = getEl("category")?.value;

  if (!name || !shopName || !residence || !nationalId || !category) {
    alert("Fill all seller fields");
    return;
  }

  const shopId = "SHOP-" + Math.floor(Math.random() * 100000);

  const seller = { name, shopName, residence, nationalId, category, shopId };

  localStorage.setItem("seller", JSON.stringify(seller));

  alert("Shop Registered ✅\nYour Shop ID: " + shopId);
  window.location.href = "seller-login.html";
}

function loginSeller() {
  const shopId = getEl("loginShopId")?.value;
  const name = getEl("loginName")?.value;

  const seller = JSON.parse(localStorage.getItem("seller"));

  if (!seller) return alert("No seller account found");

  if (shopId === seller.shopId && name === seller.name) {
    alert("Seller login successful ✅");
    window.location.href = "seller-dashboard.html";
  } else {
    alert("Invalid seller details");
  }
}

function logoutSeller() {
  localStorage.removeItem("seller");
  window.location.href = "index.html";
}

/* =========================
   ADD PRODUCT
========================= */
function addProduct() {
  const name = getEl("pName")?.value;
  const price = getEl("pPrice")?.value;
  const image = getEl("pImage")?.value;
  const category = getEl("pCategory")?.value;

  if (!name || !price || !image || !category) {
    alert("Fill all product fields");
    return;
  }

  const product = { name, price, image, category };

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));

  alert("Product uploaded ✅");

  loadProducts();
}

/* =========================
   MARKETPLACE PRODUCTS
========================= */

let marketplaceProducts =
JSON.parse(
localStorage.getItem("marketplaceProducts")
) || [];

/* =========================
   AUTO SELLER RATING
========================= */

function generateSellerRating(){

return (
(Math.random() * 1 + 4)
).toFixed(1);

}

/* =========================
   UPLOAD PRODUCT
========================= */

function uploadProduct(product){

product.sellerRating =
generateSellerRating();

marketplaceProducts.push(product);

localStorage.setItem(
"marketplaceProducts",
JSON.stringify(marketplaceProducts)
);

renderProducts();

}

/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(){

const container =
document.getElementById("productGrid") ||

document.getElementById("productList") ||

document.getElementById("localProducts") ||

document.getElementById("internationalProducts");

if(!container){

console.log("No product container found");

return;

}

container.innerHTML = "";

marketplaceProducts.forEach(product => {

const div =
document.createElement("div");

div.className =
"product-card";

div.innerHTML = `

<img src="${product.image}" />

<div class="product-info">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<div class="rating">

⭐ ${product.sellerRating}
Seller Rating

</div>

<div style="
margin-top:8px;
font-size:14px;
opacity:0.8;
">

👤 ${product.seller}

</div>

<div class="icon-row">

<span>❤️</span>

<span>🔥</span>

<span>🛒</span>

</div>

<button
class="cart-btn"
onclick='addToCart(
"${product.name}",
"${product.price}",
"${product.image}"
)'
>

Add To Cart

</button>

<button
style="
margin-top:10px;
width:100%;
"
onclick='buyProduct(
"${product.name}",
${product.price}
)'
>

Buy Now

</button>

<button
class="whatsapp-btn"
style="
margin-top:10px;
width:100%;
background:#25D366;
"
onclick='contactSeller(
"${product.name}",
${product.price}
)'
>

💬 Contact Us

</button>

</div>

`;

container.appendChild(div);

});

}

/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts(category){

if(category === "all"){

renderProducts();

return;

}

const filtered =
marketplaceProducts.filter(
p => p.category === category
);

const container =
document.getElementById("productGrid");

container.innerHTML = "";

filtered.forEach(product => {

container.innerHTML += `

<div class="product-card">

<img src="${product.image}" />

<div class="product-info">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<div class="rating">

⭐ ${product.sellerRating}

</div>

<div>

👤 ${product.seller}

</div>

<button
class="cart-btn"
onclick='addToCart(
"${product.name}"
)'
>

Add To Cart

</button>

</div>

</div>

`;

});

}

/* =========================
   MARKET SWITCH
========================= */

function switchMarket(type){

const buttons =
document.querySelectorAll(
".market-btn"
);

buttons.forEach(btn => {

btn.classList.remove(
"active-market"
);

});

if(type === "national"){

buttons[0]?.classList.add(
"active-market"
);

}else{

buttons[1]?.classList.add(
"active-market"
);

}

}

/* =========================
   START PRODUCTS
========================= */

renderProducts();

/* =========================
   REELS SYSTEM
========================= */
function addReel() {
  const url = getEl("reelUrl")?.value;

  if (!url) return alert("Enter YouTube link");

  let reels = JSON.parse(localStorage.getItem("reels")) || [];
  reels.push(url);

  localStorage.setItem("reels", JSON.stringify(reels));

  alert("Reel uploaded ✅");

  loadReels();
}

function loadReels() {

  const reelList = document.getElementById("reelList");
  if (!reelList) return;

  const reels = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    "https://www.youtube.com/embed/kJQP7kiw5Fk",
    "https://www.youtube.com/embed/OPf0YbXqDm0",
    "https://www.youtube.com/embed/L_jWHffIx5E"
  ];

  reelList.innerHTML = "";

  reels.forEach(url => {

    const iframe = document.createElement("iframe");

    iframe.src =
      `${url}?autoplay=1&mute=1&loop=1&controls=0&playlist=${url.split("/").pop()}`;

    iframe.allow =
      "autoplay; encrypted-media";

    iframe.loading = "lazy";
    iframe.className = "reel-item";

    reelList.appendChild(iframe);
  });
}
function extractYouTubeID(url) {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    return u.searchParams.get("v");
  } catch {
    return null;
  }
}

/* =========================
   INIT (CRITICAL)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  showUser();
  loadReels();
});
/* =========================
   SECRET ADMIN PORTAL (FIXED)
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const logo =
    document.querySelector(".logo-area") ||
    document.querySelector(".logo") ||
    document.querySelector("h2");

  if (!logo) {
    console.warn("Logo not found for admin trigger");
    return;
  }

  let taps = 0;
  let timer = null;

  // safer than dblclick (works on mobile + desktop)
  logo.addEventListener("click", () => {

    taps++;

    clearTimeout(timer);

    timer = setTimeout(() => {
      taps = 0;
    }, 800);

    if (taps === 3) {
      console.log("ADMIN PORTAL TRIGGERED 🔐");
      window.location.href = "admin.html";
    }
  });

});
window.openReels = function () {
  const overlay = document.getElementById("reelsOverlay");

  if (!overlay) {
    alert("Reels section not found in HTML");
    return;
  }

  overlay.style.display = "flex";

  window.loadReelsFeed();
};

window.closeReels = function () {
  const overlay = document.getElementById("reelsOverlay");

  if (overlay) {
    overlay.style.display = "none";
  }
};

function closeReels() {
  document.getElementById("reelsOverlay").style.display = "none";
}
window.loadReelsFeed = function () {

  const container = document.getElementById("reelsFeed");

  if (!container) {
    console.log("No reels container found");
    return;
  }

  container.innerHTML = "";

  const reels = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  ];

  reels.forEach(src => {

    const video = document.createElement("video");

    video.src = src;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.controls = false;
    video.playsInline = true;

    container.appendChild(video);

  });

};
/* =========================
   CHATBOT
========================= */

function toggleChat() {

  const box =
    document.getElementById("chatbotBox");

  if (!box) return;

  if (
    box.style.display === "flex"
  ) {

    box.style.display = "none";

  } else {

    box.style.display = "flex";

  }

}

/* SEND MESSAGE */

function sendMessage() {

  const input =
    document.getElementById("chatInput");

  const messages =
    document.getElementById("chatMessages");

  if (!input || !messages) return;

  const text =
    input.value.trim();

  if (!text) return;

  /* USER MESSAGE */

  const userDiv =
    document.createElement("div");

  userDiv.className =
    "user-message";

  userDiv.innerText = text;

  messages.appendChild(userDiv);

  /* BOT RESPONSE */

  const botDiv =
    document.createElement("div");

  botDiv.className =
    "bot-message";

  const lower =
    text.toLowerCase();

  let reply =
    "I can help with products, delivery, payments and sellers.";

  /* SMART REPLIES */

  if (
    lower.includes("hello") ||
    lower.includes("hi")
  ) {

    reply =
      "👋 Welcome to EMARKET! How can I help you today?";

  }

  else if (
    lower.includes("payment")
  ) {

    reply =
      "💳 We support Visa, Mastercard, EcoCash and Innbucks.";

  }

  else if (
    lower.includes("delivery")
  ) {

    reply =
      "🚚 Delivery usually takes 1-3 days locally.";

  }

  else if (
    lower.includes("seller")
  ) {

    reply =
      "🏪 Sellers can register using the Become Seller button.";

  }

  else if (
    lower.includes("products")
  ) {

    reply =
      "🛍️ We offer electronics, fashion, gaming, vehicles and more.";

  }

  else if (
    lower.includes("contact")
  ) {

    reply =
      "📞 Contact support at support@emarket.africa";

  }

  else if (
    lower.includes("refund")
  ) {

    reply =
      "💵 Refunds are processed within 3-5 business days.";

  }

  setTimeout(() => {

    botDiv.innerText = reply;

    messages.appendChild(botDiv);

    messages.scrollTop =
      messages.scrollHeight;

  }, 500);

  input.value = "";

}

/* ENTER KEY */

function handleChat(event) {

  if (event.key === "Enter") {

    sendMessage();

  }

}

window.toggleChat = toggleChat;

window.sendMessage = sendMessage;

window.handleChat = handleChat;
/* =========================
   CHAT BUTTON OPEN
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const chatBtn =
      document.getElementById("chatToggle");

    if (chatBtn) {

      chatBtn.addEventListener(
        "click",
        function () {

          const chatbot =
            document.getElementById("chatbotBox");

          if (!chatbot) return;

          if (
            chatbot.style.display === "flex"
          ) {

            chatbot.style.display = "none";

          } else {

            chatbot.style.display = "flex";

          }

        }
      );

    }

  }
);
/* =========================
   CHATBOT TOGGLE
========================= */

function toggleChatbot() {

  const box =
    document.getElementById("chatbotBox");

  if (!box) return;

  if (
    box.style.display === "flex"
  ) {

    box.style.display = "none";

  } else {

    box.style.display = "flex";

  }

}

/* =========================
   CHATBOT SEND MESSAGE
========================= */

function sendMessage() {

  const input =
    document.getElementById("chatInput");

  const messages =
    document.getElementById("chatMessages");

  if (!input || !messages) return;

  const text =
    input.value.trim();

  if (text === "") return;

  /* USER MESSAGE */

  const userDiv =
    document.createElement("div");

  userDiv.className =
    "user-message";

  userDiv.innerText = text;

  messages.appendChild(userDiv);

  /* BOT REPLY */

  const botDiv =
    document.createElement("div");

  botDiv.className =
    "bot-message";

  let reply =
    "I can help with products, payments, delivery, sellers and shopping.";

  const lower =
    text.toLowerCase();

  if (
    lower.includes("hello") ||
    lower.includes("hi")
  ) {

    reply =
      "Hello 👋 Welcome to EMARKET.";

  }

  else if (
    lower.includes("payment")
  ) {

    reply =
      "We support EcoCash, Visa, Mastercard and Innbucks.";

  }

  else if (
    lower.includes("delivery")
  ) {

    reply =
      "We offer Zimbabwe and international delivery 🚚";

  }

  else if (
    lower.includes("seller")
  ) {

    reply =
      "You can become a seller using the Become Seller button.";

  }

  else if (
    lower.includes("products")
  ) {

    reply =
      "We have electronics, fashion, gaming, beauty, cars and more.";

  }

  setTimeout(() => {

    botDiv.innerText = reply;

    messages.appendChild(botDiv);

    messages.scrollTop =
      messages.scrollHeight;

  }, 500);

  input.value = "";

  messages.scrollTop =
    messages.scrollHeight;

}

/* EXPORTS */

window.toggleChatbot =
  toggleChatbot;

window.sendMessage =
  sendMessage;
/* =========================
   EMARKET AI ASSISTANT
========================= */

function sendMessage() {

const input =
document.getElementById("chatInput");

const messages =
document.getElementById("chatMessages");

if(!input || !messages) return;

const text =
input.value.trim();

if(text === "") return;

/* USER MESSAGE */

messages.innerHTML += `

<div class="user-message">

${text}

</div>

`;

/* AI RESPONSE */

let reply = getAIResponse(
text.toLowerCase()
);

setTimeout(()=>{

messages.innerHTML += `

<div class="bot-message">

${reply}

</div>

`;

messages.scrollTop =
messages.scrollHeight;

},600);

input.value = "";

messages.scrollTop =
messages.scrollHeight;

}

/* =========================
   SMART AI RESPONSES
========================= */

function getAIResponse(message) {

/* GREETINGS */

if(
message.includes("hello") ||
message.includes("hi")
){

return `
👋 Hello! Welcome to EMARKET.
How can I help you today?
`;

}

/* PRODUCTS */

if(
message.includes("products") ||
message.includes("buy")
){

return `
🛍 EMARKET has electronics, fashion, beauty, vehicles, furniture, gaming products and more.

Use the categories section to explore products.
`;

}

/* DELIVERY */

if(
message.includes("delivery") ||
message.includes("shipping")
){

return `
🚚 EMARKET offers nationwide and international delivery services.

Delivery times depend on your location and seller.
`;

}

/* PAYMENT */

if(
message.includes("payment") ||
message.includes("pay")
){

return `
💳 We support EcoCash, Visa, Mastercard and other payment systems.
`;

}

/* SELLER */

if(
message.includes("seller") ||
message.includes("sell")
){

return `
🏪 To become a seller, press the "Become Seller" button on the homepage and register your shop.
`;

}

/* AI */

if(
message.includes("ai") ||
message.includes("assistant")
){

return `
🤖 I am the EMARKET AI Assistant.

I can help with products, sellers, payments, orders, delivery and platform guidance.
`;

}

/* REELS */

if(
message.includes("reels") ||
message.includes("videos")
){

return `
🎬 EMARKET reels help promote trending products and marketing campaigns in real time.
`;

}

/* ADMIN */

if(
message.includes("admin")
){

return `
🔐 Admin access is restricted to authorized EMARKET administrators only.
`;

}

/* DEFAULT */

return `
🤖 I understand your question.

EMARKET AI is continuously improving to assist with:
• Shopping
• Orders
• Payments
• Sellers
• Marketing
• Product discovery
• Customer support

Please ask another question 🚀
`;

}

/* =========================
   ENTER KEY SUPPORT
========================= */

document.addEventListener(
"DOMContentLoaded",
()=>{

const input =
document.getElementById("chatInput");

if(input){

input.addEventListener(
"keypress",
function(e){

if(e.key === "Enter"){

sendMessage();

}

}
);

}

});
/* =========================
   PAYMENT SYSTEM
========================= */

function pay() {

const order =
JSON.parse(
localStorage.getItem("currentOrder")
);

if(!order){

alert("No order selected");

return;

}

const bar =
document.getElementById("loadingBar");

if(bar){

bar.style.width = "100%";

}

setTimeout(()=>{

if(bar){

bar.style.width = "0%";

}

/* SAVE RECEIPT */

const receipt = {

...order,

status: "Paid",

paymentDate:
new Date().toLocaleString()

};

localStorage.setItem(
"receipt",
JSON.stringify(receipt)
);

window.location.href =
"receipt.html";

},2000);

}
/* =========================
   ADVANCED REELS
========================= */

const marketingReels = [

{
video:
"https://cdn.coverr.co/videos/coverr-young-woman-shopping-online-1564841113854?download=1080p",

user:
"TechWorld Store",

caption:
"New gadgets just arrived 🔥",

profile:
"https://i.pravatar.cc/100?img=12"
},

{
video:
"https://cdn.coverr.co/videos/coverr-clothes-shopping-1571577292472?download=1080p",

user:
"Fashion Hub",

caption:
"Trending fashion collection 👕",

profile:
"https://i.pravatar.cc/100?img=33"
},

{
video:
"https://cdn.coverr.co/videos/coverr-cosmetics-and-beauty-products-1562676707026?download=1080p",

user:
"Beauty Africa",

caption:
"Luxury beauty products ✨",

profile:
"https://i.pravatar.cc/100?img=45"
},

{
video:
"https://cdn.coverr.co/videos/coverr-man-using-smartphone-1562682987436?download=1080p",

user:
"Mobile Planet",

caption:
"Latest smartphone deals 📱",

profile:
"https://i.pravatar.cc/100?img=18"
}

];

/* =========================
   OPEN REELS
========================= */

function openReels(){

const overlay =
document.getElementById(
"reelsOverlay"
);

const feed =
document.getElementById(
"reelsFeed"
);

feed.innerHTML = "";

marketingReels.forEach(reel=>{

feed.innerHTML += `

<div class="full-reel">

<video
autoplay
muted
loop
playsinline
controls>

<source
src="${reel.video}"
type="video/mp4">

</video>

<div class="reel-actions">

<div>
❤️
<span>12K</span>
</div>

<div>
💬
<span>542</span>
</div>

<div>
📤
<span>Share</span>
</div>

</div>

<div class="reel-bottom">

<div class="reel-user">

<img src="${reel.profile}">

<div>

<h3>
${reel.user}
</h3>

<p>
${reel.caption}
</p>

</div>

</div>

</div>

</div>

`;

});

overlay.style.display = "flex";

}

/* =========================
   CLOSE REELS
========================= */

function closeReels(){

document.getElementById(
"reelsOverlay"
).style.display = "none";

}
/* =========================
   CART SYSTEM
========================= */

function getCart() {

  return JSON.parse(
    localStorage.getItem("cart")
  ) || [];

}

function saveCart(cart) {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}

/* =========================
   ADD TO CART
========================= */

function addToCart(
  productName,
  productPrice,
  productImage
) {

  let cart = getCart();

  const existing =
    cart.find(item =>
      item.name === productName
    );

  if(existing){

    existing.qty += 1;

  }else{

    cart.push({

      id: Date.now(),

      name: productName,

      price: Number(productPrice),

      image: productImage,

      qty: 1

    });

  }

  saveCart(cart);

  updateCartCount();

  loadCart();

  alert(
    productName +
    " added to cart 🛒"
  );

}

/* =========================
   REMOVE ITEM
========================= */

function removeFromCart(productName){

  let cart = getCart();

  cart = cart.filter(item =>

    item.name !== productName

  );

  saveCart(cart);

  loadCart();

  updateCartCount();

}

/* =========================
   CHANGE QUANTITY
========================= */

function changeQty(
  productName,
  action
){

  let cart = getCart();

  cart.forEach(item=>{

    if(item.name === productName){

      if(action === "plus"){

        item.qty++;

      }

      if(action === "minus"){

        item.qty--;

      }

    }

  });

  cart = cart.filter(
    item => item.qty > 0
  );

  saveCart(cart);

  loadCart();

  updateCartCount();

}

/* =========================
   LOAD CART
========================= */

function loadCart(){

  const cartItems =
    document.getElementById(
      "cartItems"
    );

  const cartTotal =
    document.getElementById(
      "cartTotal"
    );

  if(!cartItems) return;

  const cart = getCart();

  cartItems.innerHTML = "";

  let total = 0;

  if(cart.length === 0){

    cartItems.innerHTML = `

      <div class="empty-cart">

        <h3>
        🛒 Cart Empty
        </h3>

        <p>
        No products added yet.
        </p>

      </div>

    `;

    if(cartTotal){

      cartTotal.innerText = "0";

    }

    return;

  }

  cart.forEach(item=>{

    const subtotal =
      item.price * item.qty;

    total += subtotal;

    const div =
      document.createElement("div");

    div.className =
      "cart-item";

    div.innerHTML = `

      <img
      src="${item.image}"
      >

      <div class="cart-info">

        <h3>
        ${item.name}
        </h3>

        <p>
        $${item.price}
        </p>

        <small>

        Subtotal:
        $${subtotal}

        </small>

        <div class="qty-box">

          <button
          onclick="
          changeQty(
          '${item.name}',
          'minus'
          )
          ">
          -
          </button>

          <span>
          ${item.qty}
          </span>

          <button
          onclick="
          changeQty(
          '${item.name}',
          'plus'
          )
          ">
          +
          </button>

        </div>

      </div>

      <button

      class="remove-btn"

      onclick="
      removeFromCart(
      '${item.name}'
      )
      "

      >

      ✖

      </button>

    `;

    cartItems.appendChild(div);

  });

  if(cartTotal){

    cartTotal.innerText =
      total.toFixed(2);

  }

}

/* =========================
   CART COUNT
========================= */

function updateCartCount(){

  const cart =
    getCart();

  const count =
    document.getElementById(
      "cartCount"
    );

  if(!count) return;

  let totalItems = 0;

  cart.forEach(item=>{

    totalItems += item.qty;

  });

  count.innerText =
    totalItems;

}

/* =========================
   OPEN CART
========================= */

function openCart(){

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  if(overlay){

    overlay.style.display =
      "flex";

  }

  loadCart();

}

/* =========================
   CLOSE CART
========================= */

function closeCart(){

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  if(overlay){

    overlay.style.display =
      "none";

  }

}

/* =========================
   CHECKOUT
========================= */

function checkoutCart(){

  const cart =
    getCart();

  if(cart.length === 0){

    alert(
      "Cart is empty"
    );

    return;

  }

  localStorage.setItem(

    "checkoutCart",

    JSON.stringify(cart)

  );

  window.location.href =
    "checkout.html";

}

/* =========================
   INIT
========================= */

document.addEventListener(

  "DOMContentLoaded",

  function(){

    updateCartCount();

    loadCart();

  }

);

/* =========================
   GLOBALS
========================= */

window.addToCart =
addToCart;

window.removeFromCart =
removeFromCart;

window.changeQty =
changeQty;

window.openCart =
openCart;

window.closeCart =
closeCart;

window.checkoutCart =
checkoutCart;

/* =========================
   CONTACT SELLER
========================= */

function contactSeller(productName, price){

const message =
`Hello Benike Technologies, I am interested in ${productName} ($${price}). Is it still available?`;

window.open(
`https://wa.me/263784324361?text=${encodeURIComponent(message)}`,
'_blank'
);

}
