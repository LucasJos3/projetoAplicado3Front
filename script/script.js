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
      const tableBody = document.querySelector("#product-table tbody");
      data.forEach((product) => {
        const row = document.createElement("tr");

        const cellId = document.createElement("td");
        cellId.textContent = product.id;
        row.appendChild(cellId);

        const cellName = document.createElement("td");
        cellName.textContent = product.name;
        row.appendChild(cellName);

        const cellDescription = document.createElement("td");
        cellDescription.textContent = product.description;
        row.appendChild(cellDescription);

        const cellActions = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
          deleteProduct(product.id);
        });
        cellActions.appendChild(deleteButton);
        row.appendChild(cellActions);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching product data:", error));
});

function deleteProduct(id) {
  fetch(`http://localhost:8080/product/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Produto excluído com sucesso!");
        location.reload(); // Recarrega a página para atualizar a lista de produtos
      } else {
        alert("Erro ao excluir produto.");
      }
    })
    .catch((error) => console.error("Error deleting product:", error));
}
