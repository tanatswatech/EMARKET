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

  const products =
    JSON.parse(localStorage.getItem("products")) || [];

  displayProducts(products);

}

/* =========================
   DISPLAY PRODUCTS
========================= */
function displayProducts(products) {

  const productList =
    document.getElementById("productList");

  if (!productList) return;

  productList.innerHTML = "";

  products.forEach(product => {

    const div =
      document.createElement("div");

    div.className = "product-card";

    div.innerHTML = `
      <img src="${product.image}">

      <div class="product-info">

        <h3>${product.name}</h3>

        <p>$${product.price}</p>

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

    productList.appendChild(div);

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
      p => p.category.toLowerCase() === category
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
