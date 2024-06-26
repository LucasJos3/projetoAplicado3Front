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
      method: "post",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json;application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        submitting = false;

        if (!response.ok) {
          throw new Error(
            "Não foi possível cadastrar Apontamento: " + response.statusText
          );
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

//ATUALIZAR APONTAMENTO

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("production-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const planQuantity = document.getElementById("planQuantity").value;
    const realQuantity = document.getElementById("realQuantity").value;
    const unit = document.getElementById("unit").value;
    const startTime = document.getElementById("startTime").value;
    const finishTime = document.getElementById("finishTime").value;
    const downtime = document.getElementById("downtime").value;
    const packageType = document.getElementById("packageType").value;
    const labelType = document.getElementById("labelType").value;
    const equipment = document.getElementById("equipment").value;
    const bestBefore = document.getElementById("bestBefore").value;
    const notes = document.getElementById("notes").value;

    const apontamentoData = {
      planQuantity: planQuantity,
      realQuantity: realQuantity,
      unit: unit,
      startTime: startTime,
      finishTime: finishTime,
      downtime: downtime,
      packageType: packageType,
      labelType: labelType,
      equipment: equipment,
      bestBefore: bestBefore,
      notes: notes,
    };

    fetch(`http://localhost:8080/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;application/x-www-form-urlencoded",
      },
      body: JSON.stringify(apontamentoData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.planQuantity != null) {
          alert("Apontamento atualizado com sucesso!");
        } else {
          alert("Falha ao atualizar o apontamento: " + data.message);
        }
        document.getElementById("production-form").reset();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao atualizar o apontamento." + data.message);
      });
  });
});
