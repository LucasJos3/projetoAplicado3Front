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

function deleteProduct(event) {
  event.preventDefault(); // Impede o envio do formulário

  let userId = document.getElementById("user-id").value; // Recupera o valor digitado no campo
  if (!userId) {
    alert("Por favor, insira um ID de produto válido.");
    return;
  }

  let url = `http://localhost:8080/user/${userId}`; // Constrói a URL com o ID do produto

  let submitting = true;

  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      submitting = false;
      if (!response.ok) {
        throw new Error("Erro ao excluir produto: " + response.statusText);
      }
      alert("Produto excluído com sucesso!");
      document.getElementById("product-form").reset(); // Limpa os campos do formulário
    })
    .catch((error) => {
      submitting = false;
      alert("Erro ao excluir produto: " + error.message);
    });
}
