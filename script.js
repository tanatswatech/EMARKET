console.log("EMARKET SCRIPT LOADED ✅");

/* =========================
   BUY SYSTEM
========================= */
function buyProduct() {

  const user =
    JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {

    alert("Please login first");

    window.location.href = "register.html";

  } else {

    window.location.href = "checkout.html";

  }

}

/* =========================
   CART SYSTEM
========================= */
function addToCart(productName) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(productName);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  alert(productName + " added to cart 🛒");

}

/* =========================
   USER REGISTER
========================= */
function registerUser() {

  const name =
    document.getElementById("name")?.value;

  const surname =
    document.getElementById("surname")?.value;

  const email =
    document.getElementById("email")?.value;

  const password =
    document.getElementById("password")?.value;

  if (!name || !surname || !email || !password) {

    alert("Fill all fields");

    return;

  }

  const user = {
    name,
    surname,
    email,
    password
  };

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify(user)
  );

  alert("Registration successful ✅");

  window.location.href = "index.html";

}

/* =========================
   USER LOGIN
========================= */
function loginUser() {

  const email =
    document.getElementById("loginEmail")?.value;

  const password =
    document.getElementById("loginPassword")?.value;

  const savedUser =
    JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {

    alert("No account found");

    return;

  }

  if (
    email === savedUser.email &&
    password === savedUser.password
  ) {

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(savedUser)
    );

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

  const user =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const nav =
    document.querySelector(".nav-links");

  if (!nav) return;

  if (user) {

    nav.innerHTML = `
      <span style="margin-right:10px;">
        👋 ${user.name}
      </span>

      <a href="#" onclick="logout()">
        Logout
      </a>
    `;

  }

}

/* =========================
   LOGOUT
========================= */
function logout() {

  localStorage.removeItem("loggedInUser");

  location.reload();

}

/* =========================
   SELLER REGISTER
========================= */
function registerSeller() {

  const name =
    document.getElementById("sName")?.value;

  const shopName =
    document.getElementById("shopName")?.value;

  const residence =
    document.getElementById("residence")?.value;

  const nationalId =
    document.getElementById("nationalId")?.value;

  const category =
    document.getElementById("category")?.value;

  if (
    !name ||
    !shopName ||
    !residence ||
    !nationalId ||
    !category
  ) {

    alert("Fill all seller fields");

    return;

  }

  const shopId =
    "SHOP-" +
    Math.floor(Math.random() * 100000);

  const seller = {
    name,
    shopName,
    residence,
    nationalId,
    category,
    shopId
  };

  localStorage.setItem(
    "seller",
    JSON.stringify(seller)
  );

  alert(
    "Shop Registered ✅\n\nYour Shop ID: " +
    shopId
  );

  window.location.href =
    "seller-login.html";

}

/* =========================
   SELLER LOGIN
========================= */
function loginSeller() {

  const shopId =
    document.getElementById("loginShopId")?.value;

  const name =
    document.getElementById("loginName")?.value;

  const seller =
    JSON.parse(localStorage.getItem("seller"));

  if (!seller) {

    alert("No seller account found");

    return;

  }

  if (
    shopId === seller.shopId &&
    name === seller.name
  ) {

    alert("Seller login successful ✅");

    window.location.href =
      "seller-dashboard.html";

  } else {

    alert("Invalid seller details");

  }

}

/* =========================
   SELLER LOGOUT
========================= */
function logoutSeller() {

  localStorage.removeItem("seller");

  window.location.href = "index.html";

}

/* =========================
   ADD PRODUCT
========================= */
function addProduct() {

  const name =
    document.getElementById("pName")?.value;

  const price =
    document.getElementById("pPrice")?.value;

  const image =
    document.getElementById("pImage")?.value;

  const category =
    document.getElementById("pCategory")?.value;

  if (!name || !price || !image || !category) {

    alert("Fill all product fields");

    return;

  }

  const product = {
    name,
    price,
    image,
    category
  };

  let products =
    JSON.parse(localStorage.getItem("products")) || [];

  products.push(product);

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );

  alert("Product uploaded ✅");

  loadProducts();

  updateStats();

}

/* =========================
   LOAD PRODUCTS
========================= */
function loadProducts() {

  let products =
    JSON.parse(localStorage.getItem("products"));

  // FIRST TIME DEMO PRODUCTS
  if (!products || products.length === 0) {

    products = [

      /* ===================
         LOCAL PRODUCTS
      =================== */

      {
        name: "Mountain Bike",
        price: 320,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "local"
      },

      {
        name: "Gaming Headphones",
        price: 89,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        category: "local"
      },

      {
        name: "Leather Sofa",
        price: 540,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        category: "local"
      },

      {
        name: "iPhone 15 Pro",
        price: 1200,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
        category: "local"
      },

      {
        name: "Nike Sneakers",
        price: 140,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "local"
      },

      {
        name: "Smart TV 55 Inch",
        price: 790,
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
        category: "local"
      },

      {
        name: "Office Chair",
        price: 180,
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
        category: "local"
      },

      {
        name: "Perfume Set",
        price: 60,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539",
        category: "local"
      },

      {
        name: "Laptop HP Elite",
        price: 870,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        category: "local"
      },

      {
        name: "PS5 Controller",
        price: 95,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3",
        category: "local"
      },

      /* ===================
         INTERNATIONAL
      =================== */

      {
        name: "Rolex Watch",
        price: 4200,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
        category: "international"
      },

      {
        name: "MacBook Pro",
        price: 2500,
        image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
        category: "international"
      },

      {
        name: "Designer Handbag",
        price: 980,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        category: "international"
      },

      {
        name: "Canon Camera",
        price: 1600,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        category: "international"
      },

      {
        name: "Gaming PC",
        price: 3200,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
        category: "international"
      },

      {
        name: "Air Jordan 4",
        price: 430,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
        category: "international"
      },

      {
        name: "Samsung Galaxy S25",
        price: 1400,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
        category: "international"
      },

      {
        name: "Luxury Bed",
        price: 2500,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        category: "international"
      }

    ];

    // DUPLICATE PRODUCTS MANY TIMES
    let manyProducts = [];

    for (let i = 0; i < 15; i++) {

      manyProducts = manyProducts.concat(products);

    }

    products = manyProducts;

    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );

  }

  displayProducts(products);

}
/* =========================
   DISPLAY PRODUCTS
========================= */
function displayProducts(products) {

  const localProducts =
    document.getElementById("localProducts");

  const internationalProducts =
    document.getElementById("internationalProducts");

  if (!localProducts || !internationalProducts) return;

  localProducts.innerHTML = "";
  internationalProducts.innerHTML = "";

  products.forEach(product => {

    const div =
      document.createElement("div");

    div.className = "product-card fade-in";

    div.innerHTML = `

      <img src="${product.image}">

      <div class="product-info">

        <h3>${product.name}</h3>

        <p>$${product.price}</p>

        <div class="icon-row">

          <span>🔥</span>
          <span>⭐</span>
          <span>🛒</span>
          <span>🚚</span>

        </div>

        <button
          class="cart-btn"
          onclick="addToCart('${product.name}')">

          Add To Cart

        </button>

        <button
          class="cart-btn"
          onclick="buyProduct()">

          Buy Now

        </button>

      </div>

    `;

    if (
      product.category &&
      product.category.toLowerCase() === "local"
    ) {

      localProducts.appendChild(div);

    } else {

      internationalProducts.appendChild(div);

    }

  });

}

/* =========================
   FILTER PRODUCTS
========================= */
function filterProducts(category) {

  const products =
    JSON.parse(localStorage.getItem("products")) || [];

  if (category === "all") {

    displayProducts(products);

    return;

  }

  const filtered =
    products.filter(
      p =>
        p.category &&
        p.category.toLowerCase() === category
    );

  displayProducts(filtered);

}

/* =========================
   UPDATE STATS
========================= */
function updateStats() {

  const el =
    document.getElementById("totalProducts");

  if (!el) return;

  const products =
    JSON.parse(localStorage.getItem("products")) || [];

  el.innerText =
    "Products: " + products.length;

}

/* =========================
   REELS
========================= */
function addReel() {

  const url =
    document.getElementById("reelUrl")?.value;

  if (!url) {

    alert("Enter YouTube link");

    return;

  }

  let reels =
    JSON.parse(localStorage.getItem("reels")) || [];

  reels.push(url);

  localStorage.setItem(
    "reels",
    JSON.stringify(reels)
  );

  alert("Reel uploaded ✅");

  loadReels();

}

/* =========================
   LOAD REELS
========================= */
function loadReels() {

  const reelList =
    document.getElementById("reelList");

  if (!reelList) return;

  const reels =
    JSON.parse(localStorage.getItem("reels")) || [];

  reelList.innerHTML = "";

  if (reels.length === 0) {

    reelList.innerHTML =
      "<p>No reels uploaded yet</p>";

    return;

  }

  reels.forEach(url => {

    const videoId =
      extractYouTubeID(url);

    if (!videoId) return;

    const iframe =
      document.createElement("iframe");

    iframe.src =
      `https://www.youtube.com/embed/${videoId}`;

    iframe.allowFullscreen = true;

    iframe.frameBorder = "0";

    reelList.appendChild(iframe);

  });

}

/* =========================
   YOUTUBE ID EXTRACTOR
========================= */
function extractYouTubeID(url) {

  try {

    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {

      return u.pathname.slice(1);

    }

    if (u.searchParams.get("v")) {

      return u.searchParams.get("v");

    }

    const shortsMatch =
      url.match(/shorts\/([a-zA-Z0-9_-]{11})/);

    if (shortsMatch) {

      return shortsMatch[1];

    }

    return null;

  } catch (e) {

    return null;

  }

}

/* =========================
   PAYMENT SYSTEM
========================= */
function pay() {

  const bar =
    document.getElementById("loadingBar");

  if (!bar) return;

  bar.style.width = "100%";

  setTimeout(() => {

    bar.style.width = "0%";

    alert("Payment successful ✅");

    window.location.href =
      "receipt.html";

  }, 2000);

}

/* =========================
   DELIVERY
========================= */
function goDelivery() {

  window.location.href =
    "delivery.html";

}

function confirmDelivery() {

  alert("Order is on the way 🚚");

}

/* =========================
   HERO SLIDER
========================= */
let currentSlide = 0;

function startHeroSlider() {

  const slides =
    document.querySelectorAll(
      ".hero-slider .slide"
    );

  if (!slides.length) return;

  setInterval(() => {

    slides[currentSlide]
      .classList.remove("active");

    currentSlide =
      (currentSlide + 1) % slides.length;

    slides[currentSlide]
      .classList.add("active");

  }, 3000);

}

/* =========================
   INIT
========================= */
document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadProducts();

    showUser();

    updateStats();

    loadReels();

    startHeroSlider();

  }
);

/* =========================
   GLOBAL EXPORTS
========================= */
/* =========================
   MARKET SWITCH
========================= */

function switchMarket(type) {

  const buttons =
    document.querySelectorAll(".market-btn");

  buttons.forEach(btn => {
    btn.classList.remove("active-market");
  });

  if (type === "national") {

    buttons[0].classList.add("active-market");

  } else {

    buttons[1].classList.add("active-market");

  }

}
window.buyProduct = buyProduct;

window.addToCart = addToCart;

window.registerUser = registerUser;

window.loginUser = loginUser;

window.logout = logout;

window.registerSeller = registerSeller;

window.loginSeller = loginSeller;

window.logoutSeller = logoutSeller;

window.addProduct = addProduct;

window.filterProducts = filterProducts;

window.addReel = addReel;

window.pay = pay;

window.goDelivery = goDelivery;

window.confirmDelivery = confirmDelivery;
/* =========================
   SECRET ADMIN ACCESS
========================= */

let tapCount = 0;

document.addEventListener("DOMContentLoaded", () => {

  const logo =
    document.querySelector(".logo");

  if (!logo) return;

  logo.addEventListener("dblclick", () => {

    window.location.href = "admin.html";

  });

});

/* =========================
   ADMIN LOGIN
========================= */
function adminLogin() {

  const username =
    document.getElementById("adminUser").value;

  const password =
    document.getElementById("adminPass").value;

  if (
    username === "admin1" &&
    password === "@dmin001"
  ) {

    document.getElementById(
      "adminLogin"
    ).style.display = "none";

    document.getElementById(
      "adminDashboard"
    ).style.display = "flex";

    loadAdminDashboard();

  } else {

    alert("Invalid admin details");

  }

}

/* =========================
   LOAD ADMIN DASHBOARD
========================= */
function loadAdminDashboard() {

  const products =
    JSON.parse(localStorage.getItem("products")) || [];

  const user =
    JSON.parse(localStorage.getItem("user"));

  document.getElementById(
    "adminProducts"
  ).innerText = products.length;

  document.getElementById(
    "adminUsers"
  ).innerText = user ? 1 : 0;

  const container =
    document.getElementById("adminProductList");

  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {

    const div =
      document.createElement("div");

    div.className = "admin-product-card";

    div.innerHTML = `

      <img src="${product.image}">

      <div>

        <h3>${product.name}</h3>

        <p>$${product.price}</p>

        <p>⭐ 4.8 Rating</p>

        <p>Seller: EMARKET Seller</p>

      </div>

    `;

    container.appendChild(div);

  });

}

window.adminLogin = adminLogin;



/* =========================
   MARKET SWITCH
========================= */

function showMarket(type, button) {

  const local =
    document.getElementById("localMarket");

  const international =
    document.getElementById("internationalMarket");

  const buttons =
    document.querySelectorAll(".market-btn");

  buttons.forEach(btn => {
    btn.classList.remove("active-market");
  });

  button.classList.add("active-market");

  if (type === "local") {

    local.style.display = "block";

    international.style.display = "none";

  } else {

    local.style.display = "none";

    international.style.display = "block";

  }

}

window.showMarket = showMarket;
