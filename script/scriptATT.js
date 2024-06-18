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
  const form = document.getElementById("updateProductForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const identifier = document.getElementById("product-id").value;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    const productData = {
      name: name,
      description: description,
    };

    fetch(`http://localhost:8080/product/${identifier}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;application/x-www-form-urlencoded",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucess) {
          //RESOLVER O PROBLEMA DE MESAGEM DE ERRO
          alert("Produto atualizado com sucesso!");
        } else {
          alert("Falha ao atualizar o produto: " + data.message);
        }
        document.getElementById("updateProductForm").reset();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao atualizar o produto.");
      });
  });
});
