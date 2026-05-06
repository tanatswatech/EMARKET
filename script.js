alert("CONNECTED ✅");
function buyProduct() {
  alert("BUY CLICKED");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    alert("NOT LOGGED IN");
    window.location.href = "register.html";
  } else {
    alert("LOGGED IN");
    window.location.href = "checkout.html";
  }
}
function registerUser() {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !surname || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = { name, surname, email, password };

  localStorage.setItem("user", JSON.stringify(user));

  // ✅ KEEP USER LOGGED IN
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Registered successfully!");

  // ✅ GO BACK TO HOMEPAGE
  window.location.href = "index.html";
}

  const user = {
    name,
    surname,
    email,
    password
  };

  // SAVE USER (LOCAL STORAGE)
  localStorage.setItem("user", JSON.stringify(user));

  alert("Registered successfully!");

  // GO TO CHECKOUT (next step)
  window.location.href = "checkout.html";
}
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No user found. Register first.");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {

    // ✅ SAVE LOGIN SESSION
    localStorage.setItem("loggedInUser", JSON.stringify(savedUser));

    alert("Login successful!");
    window.location.href = "index.html";

  } else {
    alert("Invalid login details");
  }
}
function pay() {
  const bar = document.getElementById("loadingBar");

  bar.style.width = "100%";

  setTimeout(() => {
    bar.style.width = "0%";
    alert("Payment Successful!");
    window.location.href = "receipt.html";
  }, 1500);
}
function goDelivery() {
  window.location.href = "delivery.html";
}

function confirmDelivery() {
  alert("Your product is on the way 🚚");
}
function registerSeller() {
  const name = document.getElementById("sName").value;
  const shopName = document.getElementById("shopName").value;
  const residence = document.getElementById("residence").value;
  const nationalId = document.getElementById("nationalId").value;
  const category = document.getElementById("category").value;

  if (!name || !shopName || !residence || !nationalId || !category) {
    alert("Fill all fields");
    return;
  }

  // GENERATE SHOP ID
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

  alert("Shop Registered! Your Shop ID is: " + shopId);

  window.location.href = "seller-login.html";
}
function loginSeller() {
  const shopId = document.getElementById("loginShopId").value;
  const name = document.getElementById("loginName").value;

  const seller = JSON.parse(localStorage.getItem("seller"));

  if (!seller) {
    alert("No seller found. Register first.");
    return;
  }

  if (shopId === seller.shopId && name === seller.name) {
    alert("Login successful!");
    window.location.href = "seller-dashboard.html";
  } else {
    alert("Invalid details");
  }
}
function addProduct() {
  const name = document.getElementById("pName").value;
  const price = document.getElementById("pPrice").value;
  const image = document.getElementById("pImage").value;
  const category = document.getElementById("pCategory").value;

  if (!name || !price || !image || !category) {
    alert("Fill all fields");
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
}
document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  showUser();
  updateStats();
  loadReels();
});
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  displayProducts(products);
}
function filterProducts(category) {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const filtered = products.filter(p => p.category === category);

  displayProducts(category === "all" ? products : filtered);
}
function displayProducts(products) {
  const productList = document.getElementById("productList");

  if (!productList) return;

  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${product.image}" style="width:100%; height:120px;">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="buyProduct()">Buy</button>
    `;

    productList.appendChild(div);
  });
}
function showUser() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const nav = document.querySelector(".nav-links");

  if (!nav) return;

  if (user) {
    nav.innerHTML = `
      <span style="color:white;">Hi, ${user.name}</span>
      <a href="#" onclick="logout()">Logout</a>
    `;
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}
function logoutSeller() {
  localStorage.removeItem("seller");
  window.location.href = "index.html";
}
function updateStats() {
  const el = document.getElementById("totalProducts");

  if (!el) return;

  const products = JSON.parse(localStorage.getItem("products")) || [];

  el.innerText = "Products: " + products.length;
}
function addReel() {
  const url = document.getElementById("reelUrl").value;

  if (!url) {
    alert("Enter video URL");
    return;
  }

  let reels = JSON.parse(localStorage.getItem("reels")) || [];

  reels.push(url);

  localStorage.setItem("reels", JSON.stringify(reels));

  alert("Reel added!");
}
function loadReels() {
  const reelList = document.getElementById("reelList");

  if (!reelList) return;

  const reels = JSON.parse(localStorage.getItem("reels")) || [];

  reelList.innerHTML = "";

  reels.forEach(url => {
    const video = document.createElement("video");

    video.src = url;
    video.controls = true;
    video.width = 150;

    reelList.appendChild(video);
  });
  console.log("Loading reels...");
}
