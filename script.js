function buyProduct() {
  const bar = document.getElementById("loadingBar");

  bar.style.width = "100%";

  setTimeout(() => {
    bar.style.width = "0%";
    alert("Next: Register/Login page");
  }, 1200);
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
