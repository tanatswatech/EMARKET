function buyProduct() {
  const bar = document.getElementById("loadingBar");

  bar.style.width = "100%";

  setTimeout(() => {
    bar.style.width = "0%";
    alert("Next: Register/Login page");
  }, 1200);
}
