console.log("SCRIPT LOADED ✅");

/* =======================
   BUY SYSTEM
======================= */
function buyProduct() {
  alert("BUY CLICKED");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    alert("NOT LOGGED IN → Redirecting");
    window.location.href = "register.html";
  } else {
    alert("LOGGED IN");
    window.location.href = "checkout.html";
  }
}

/* =======================
   USER REGISTER
======================= */
function registerUser() {
  const name = document.getElementById("name")?.value;
  const surname = document.getElementById("surname")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!name || !surname || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = { name, surname, email, password };

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Registered successfully!");
  window.location.href = "index.html";
}

/* =======================
   USER LOGIN
======================= */
function loginUser() {
  const email = document.getElementById("loginEmail")?.value;
  const password = document.getElementById("loginPassword")?.value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No user found");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
    alert("Login successful");
    window.location.href = "index.html";
  } else {
    alert("Invalid login");
  }
}

/* =======================
   SELLER REGISTER
======================= */
function registerSeller() {
  const name = document.getElementById("sName")?.value;
  const shopName = document.getElementById("shopName")?.value;
  const residence = document.getElementById("residence")?.value;
  const nationalId = document.getElementById("nationalId")?.value;
  const category = document.getElementById("category")?.value;

  if (!name || !shopName || !residence || !nationalId || !category) {
    alert("Fill all seller fields");
    return;
  }

  const shopId = "SHOP-" + Math.floor(Math.random() * 100000);

  const seller = {
    name,
    shopName,
    residence,
    nationalId,
    category,
    shopId
  };

  localStorage.setItem("seller", JSON.stringify(seller));

  alert("Shop Registered! ID: " + shopId);
  window.location.href = "seller-login.html";
}

/* =======================
   SELLER LOGIN
======================= */
function loginSeller() {
  const shopId = document.getElementById("loginShopId")?.value;
  const name = document.getElementById("loginName")?.value;

  const seller = JSON.parse(localStorage.getItem("seller"));

  if (!seller) {
    alert("No seller found");
    return;
  }

  if (shopId === seller.shopId && name === seller.name) {
    alert("Seller login successful");
    window.location.href = "seller-dashboard.html";
  } else {
    alert("Invalid seller details");
  }
}

/* =======================
   PRODUCTS
======================= */
function addProduct() {
  const name = document.getElementById("pName")?.value;
  const price = document.getElementById("pPrice")?.value;
  const image = document.getElementById("pImage")?.value;
  const category = document.getElementById("pCategory")?.value;

  if (!name || !price || !image || !category) {
    alert("Fill all product fields");
    return;
  }

  const product = {
    name,
    price,
    image,
    category: category.toLowerCase()
  };

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));

  alert("Product added!");
  loadProducts();
}

function loadProducts() {
  const productList = document.getElementById("productList");
  if (!productList) return;

  const products = JSON.parse(localStorage.getItem("products")) || [];

  productList.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${p.image}" width="100%">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="buyProduct()">Buy</button>
    `;

    productList.appendChild(div);
  });
}

function filterProducts(category) {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (category === "all") {
    loadProducts();
    return;
  }

  const filtered = products.filter(p => p.category === category);

  const productList = document.getElementById("productList");
  if (!productList) return;

  productList.innerHTML = "";

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${p.image}" width="100%">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="buyProduct()">Buy</button>
    `;

    productList.appendChild(div);
  });
}

/* =======================
   USER DISPLAY
======================= */
function showUser() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const nav = document.querySelector(".nav-links");

  if (!nav) return;

  if (user) {
    nav.innerHTML = `
      <span>Hi, ${user.name}</span>
      <a href="#" onclick="logout()">Logout</a>
    `;
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

/* =======================
   SELLER DASHBOARD
======================= */
function updateStats() {
  const el = document.getElementById("totalProducts");
  if (!el) return;

  const products = JSON.parse(localStorage.getItem("products")) || [];
  el.innerText = "Products: " + products.length;
}

function logoutSeller() {
  localStorage.removeItem("seller");
  window.location.href = "index.html";
}

/* =======================
   REELS
======================= */
function addReel() {
  const url = document.getElementById("reelUrl").value;

  if (!url) {
    alert("Enter YouTube link");
    return;
  }

  let reels = JSON.parse(localStorage.getItem("reels")) || [];

  reels.push(url);

  localStorage.setItem("reels", JSON.stringify(reels));

  alert("Reel added!");
  loadReels();
}
function loadReels() {
  const reelList = document.getElementById("reelList");
  if (!reelList) return;

  const reels = JSON.parse(localStorage.getItem("reels")) || [];

  reelList.innerHTML = "";

  if (reels.length === 0) {
    reelList.innerHTML = "<p>No reels yet</p>";
    return;
  }

  reels.forEach(url => {
    const videoId = extractYouTubeID(url);

    const card = document.createElement("div");
    card.style.margin = "10px";

    if (!videoId) {
      card.innerHTML = "<p>Invalid YouTube link</p>";
      reelList.appendChild(card);
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.width = "280";
    iframe.height = "450";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allowFullscreen = true;
    iframe.frameBorder = "0";
    iframe.style.borderRadius = "10px";

    card.appendChild(iframe);
    reelList.appendChild(card);
  });
}
/* =======================
   INIT (IMPORTANT)
======================= */
document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  showUser();
  updateStats();
  loadReels();
});

/* =======================
   GLOBAL EXPORTS (CRITICAL)
======================= */
window.buyProduct = buyProduct;
window.registerUser = registerUser;
window.loginUser = loginUser;

window.registerSeller = registerSeller;
window.loginSeller = loginSeller;

window.addProduct = addProduct;
window.addReel = addReel;
window.filterProducts = filterProducts;
window.logoutSeller = logoutSeller;
function extractYouTubeID(url) {
  try {
    const u = new URL(url);

    // youtu.be/k8UOCTWNbMI
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1);
    }

    // youtube.com/watch?v=XXXX
    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }

    // youtube.com/shorts/XXXX
    const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) return shortsMatch[1];

    return null;
  } catch (e) {
    return null;
  }
}
