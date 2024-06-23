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

/**Cadastra Produto */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("product-form");
  let submitting = false;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    submitting = true;

    const formData = new FormData(form);

    fetch("http://localhost:8080/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    })
      .then((response) => {
        submitting = false;

        if (!response.ok) {
          throw new Error("Erro ao cadastrar produto: " + response.statusText);
        }
        alert("Produto cadastrado com sucesso!");
        return response.json(); // Retorna os dados do backend como JSON
      })
      .then((data) => {
        displayProductData(data); // Chama a função para exibir os dados
        form.reset(); // Limpa os campos do formulário
      })
      .catch((error) => {
        submitting = false;
        alert("Erro ao cadastrar produto: " + error.message);
      });
  });

  function displayProductData(data) {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    // Cria linhas na tabela com as informações retornadas do backend
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const tr = document.createElement("tr");
        const tdKey = document.createElement("td");
        const tdValue = document.createElement("td");

        tdKey.textContent = key;
        tdValue.textContent = data[key];

        tr.appendChild(tdKey);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
      }
    }

    // Limpa a tabela existente, se houver
    const existingTable = document.getElementById("product-data-table");
    if (existingTable) {
      existingTable.parentNode.removeChild(existingTable);
    }

    // Adiciona a nova tabela abaixo do formulário
    table.appendChild(tbody);
    table.setAttribute("id", "product-data-table");
    form.parentNode.insertBefore(table, form.nextSibling);
  }
});

/**Atualiza Produto */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("updateProductForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const productId = document.getElementById("product-id").value;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    const productData = {
      name: name,
      description: description,
    };

    fetch(`http://localhost:8080/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;application/x-www-form-urlencoded",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.name != null) {         
          alert("Produto atualizado com sucesso!");
        } else {
          alert("Falha ao atualizar o produto: " + data.message);
        }
        document.getElementById("updateProductForm").reset();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao atualizar o produto." + data.message);
      });
  });
});


/**Excluir Produto */
function deleteProduct(event) {
  event.preventDefault(); // Impede o envio do formulário

  let productId = document.getElementById("product-id").value; // Recupera o valor digitado no campo
  if (!productId) {
    alert("Por favor, insira um ID de produto válido.");
    return;
  }

  let url = `http://localhost:8080/product/${productId}`; // Constrói a URL com o ID do produto

  let submitting = true;

  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;application/x-www-form-urlencoded",
    },
  })
  .then((data) => {
    if (data.status == 204) {
      alert("Produto excluído com sucesso!");
    } else if (data.status == 404) {
      alert("Erro ao excluir Produto. ID: " + "Id " + productId + " não encontrado");
    }
    document.getElementById("product-form-delete").reset(); // Limpa os campos do formulário
  })
  .catch((error) => {
    submitting = false;
    alert("Erro ao excluir produto catch: " + error.message);
  });   
}

