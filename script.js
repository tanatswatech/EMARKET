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
function buyProduct() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

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
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productName);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(productName + " added to cart 🛒");
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
   LOAD PRODUCTS (CORE FIX)
========================= */
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products"));

  if (!products || products.length === 0) {
    products = generateDemoProducts();

    localStorage.setItem("products", JSON.stringify(products));
  }

  displayProducts(products);
}

/* =========================
   DEMO PRODUCTS (100+ SAFE)
========================= */
function generateDemoProducts() {
  const base = [
    { name: "iPhone 15 Pro", price: 1200, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569", category: "electronics" },
    { name: "MacBook Pro", price: 2500, image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8", category: "electronics" },
    { name: "Nike Shoes", price: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "fashion" },
    { name: "Gaming PC", price: 3200, image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7", category: "gaming" },
    { name: "Luxury Watch", price: 4000, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49", category: "luxury" }
  ];

  let big = [];

  for (let i = 0; i < 30; i++) {
    big = big.concat(base.map(p => ({ ...p })));
  }

  return big;
}

/* =========================
   DISPLAY PRODUCTS (FIXED MAIN BUG)
========================= */
function displayProducts(products) {
  const container =
    getEl("productList") ||
    getEl("localProducts") ||
    getEl("internationalProducts");

  if (!container) {
    console.error("❌ No product container found in HTML");
    return;
  }

  container.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${product.image}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>

        <button onclick="addToCart('${product.name}')">Add To Cart</button>
        <button onclick="buyProduct()">Buy Now</button>
      </div>
    `;

    container.appendChild(div);
  });
}

/* =========================
   FILTER PRODUCTS
========================= */
function filterProducts(category) {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (category === "all") {
    displayProducts(products);
    return;
  }

  const filtered = products.filter(p => p.category === category);

  displayProducts(filtered);
}

/* =========================
   MARKET SWITCH
========================= */
function switchMarket(type) {
  const buttons = document.querySelectorAll(".market-btn");

  buttons.forEach(b => b.classList.remove("active-market"));

  if (type === "national") {
    buttons[0]?.classList.add("active-market");
  } else {
    buttons[1]?.classList.add("active-market");
  }
}

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
function openReels() {
  document.getElementById("reelsOverlay").style.display = "flex";
  loadReelsFeed();
}

function closeReels() {
  document.getElementById("reelsOverlay").style.display = "none";
}
function loadReelsFeed() {

  const container =
    document.getElementById("reelsFeed");

  if (!container) return;

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

}
