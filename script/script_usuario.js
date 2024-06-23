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


/**Cadastra Usuario */
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

/**Atualiza Usuario */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("updateUserForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("user-id").value;
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const type = document.getElementById("type").value;

    const UserData = {
      name: name,
      position: position,
      type: type,
    };

    fetch(`http://localhost:8080/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;application/x-www-form-urlencoded",
      },
      body: JSON.stringify(UserData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.name != null) {
          alert("Usúario atualizado com sucesso!");
        } else {
          alert("Falha ao atualizar o Usúario " + JSON.stringify(data.message));
        }
        document.getElementById("updateUserForm").reset();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao atualizar o usúario." + data.body);
      });
  });
});

/**Excluir Usuario */
function deleteProduct(event) {
  event.preventDefault(); // Impede o envio do formulário

  let userId = document.getElementById("user-id").value; // Recupera o valor digitado no campo
  if (!userId) {
    alert("Por favor, insira um ID de Usúario válido.");
    return;
  }

  let url = `http://localhost:8080/user/${userId}`; // Constrói a URL com o ID do produto

  let submitting = true;

  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;application/x-www-form-urlencoded",
    }
  })
    .then((data) => {
      if (data.status == 204) {
        alert("Usúario excluído com sucesso!");
      } else if (data.status == 404) {
        alert("Erro ao excluir usúario. ID: " + "Id " + userId + " não encontrado");
      }
      document.getElementById("product-form").reset(); // Limpa os campos do formulário
    })
    .catch((error) => {
      submitting = false;
      alert("Erro ao excluir usúario catch: " + error.message);
    });
}
