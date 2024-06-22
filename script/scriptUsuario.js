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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-cadastro");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const position = document.getElementById("position").value.trim();
    const type = document.getElementById("type").value.trim();

    if (!name || !position || !type) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, position, type }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar usuário: " + response.statusText);
        }
        alert("Usuário cadastrado com sucesso!");
        form.reset(); // Limpa os campos do formulário
      })
      .catch((error) => {
        alert("Erro ao cadastrar usuário: " + error.message);
      });
  });
});
