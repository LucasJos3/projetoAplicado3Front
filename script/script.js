function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function toggleDropdown() {
  document.getElementById("userDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".user-icon")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function logout() {
  // Implementar a lógica de logout aqui
  alert("Logout realizado!");
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/product")
    .then((response) => response.json())
    .then((data) => {
      const productContainer = document.getElementById("product-container");
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const productName = document.createElement("h2");
      productName.textContent = data.name;

      const productDescription = document.createElement("p");
      productDescription.textContent = data.description;

      productDiv.appendChild(productName);
      productDiv.appendChild(productDescription);

      productContainer.appendChild(productDiv);
    })
    .catch((error) => console.error("Error fetching product data:", error));
});
