
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
  const form = document.getElementById("production-form");
  let submitting = false;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    submitting = true;

    const formData = new FormData(form);

    fetch("http://localhost:8080/production", {
      method: 'post',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json;application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        submitting = false;

        if (!response.ok) {
          throw new Error("Não foi possível cadastrar Apontamento: " + response.statusText);
        }
        alert("Apontamento cadastrado com sucesso!");
        return response.json(); // Retorna os dados do backend como JSON
      })
      .then((data) => {
        displayProductData(data); // Chama a função para exibir os dados
        form.reset(); // Limpa os campos do formulário
      })
      .catch((error) => {
        submitting = false;
        alert("Erro ao cadastrar Apontamento: " + error.message);
        form.reset();
      });
  });
});
