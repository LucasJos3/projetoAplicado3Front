// function openNav() {
//   document.getElementById("mySidebar").style.width = "250px";
//   document.getElementById("main").style.marginLeft = "250px";
// }

// function closeNav() {
//   document.getElementById("mySidebar").style.width = "0";
//   document.getElementById("main").style.marginLeft = "0";
// }

// function toggleDropdown() {
//   document.getElementById("userDropdown").classList.toggle("show");
// }

// window.onclick = function (event) {
//   if (!event.target.matches(".user-icon")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     for (var i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };

// function logout() {
//   // Implementar a lógica de logout aqui
//   alert("Logout realizado!");
// }

// document.addEventListener("DOMContentLoaded", function () {
//   fetch("http://localhost:8080/product", {
//     method: "POST",  // Método HTTP especificado corretamente dentro de um objeto de opções
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const tableBody = document.querySelector("#product-table tbody");
//       data.forEach((product) => {
//         const row = document.createElement("tr");

//         const cellId = document.createElement("td");
//         cellId.textContent = product.id;
//         row.appendChild(cellId);

//         const cellName = document.createElement("td");
//         cellName.textContent = product.name;
//         row.appendChild(cellName);

//         const cellDescription = document.createElement("td");
//         cellDescription.textContent = product.description;
//         row.appendChild(cellDescription);

//         const cellActions = document.createElement("td");
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "Excluir";
//         deleteButton.classList.add("delete-button");
//         deleteButton.addEventListener("click", function () {
//           deleteProduct(product.id);
//         });
//         cellActions.appendChild(deleteButton);
//         row.appendChild(cellActions);

//         tableBody.appendChild(row);
//       });
//     })
//     .catch((error) => console.error("Error fetching product data:", error));
// });


// function deleteProduct(id) {
//   fetch(`http://localhost:8080/product/${id}`, {
//     method: "DELETE",
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Produto excluído com sucesso!");
//         location.reload(); // Recarrega a página para atualizar a lista de produtos
//       } else {
//         alert("Erro ao excluir produto.");
//       }
//     })
//     .catch((error) => console.error("Error deleting product:", error));
// }

// document.addEventListener('DOMContentLoaded', function() {
//   const form = document.getElementById('product-form');

//   form.addEventListener('submit', function(event) {
//     event.preventDefault(); // Previne o comportamento padrão de envio do formulário

//     const formData = new FormData(form);

//     fetch('http://localhost:8080/product', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: new URLSearchParams(formData)
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Erro ao cadastrar produto: ' + response.statusText);
//       }
//       alert('Produto cadastrado com sucesso!');
//       window.location.href = './cadastrar_produto.html'; // Redireciona após sucesso
//     })
//     .catch(error => {
//       alert('Erro ao cadastrar produto: ' + error.message);
//     });
//   });
// });

// //ESTE CÓDIGO FUNCIONOU PARA GRAVAR A INFORMAÇÃO NO BD E FICAR NA MESMA TELA

// document.addEventListener('DOMContentLoaded', function() {
//   const form = document.getElementById('product-form');
//   let submitting = false; // Variável para controlar se o formulário está sendo enviado

//   form.addEventListener('submit', function(event) {
//     event.preventDefault(); // Previne o comportamento padrão de envio do formulário

//     if (submitting) {
//       return; // Se já estiver enviando, saia da função
//     }

//     submitting = true; // Marca que o formulário está sendo enviado

//     const formData = new FormData(form);

//     fetch('http://localhost:8080/product', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: new URLSearchParams(formData)
//     })
//     .then(response => {
//       submitting = false; // Marca que o envio foi concluído

//       if (!response.ok) {
//         throw new Error('Erro ao cadastrar produto: ' + response.statusText);
//       }
//       alert('Produto cadastrado com sucesso!');
//       window.location.href = './cadastrar_produto.html'; // Redireciona após sucesso
//     })
//     .catch(error => {
//       submitting = false; // Marca que ocorreu um erro no envio
//       alert('Erro ao cadastrar produto: ' + error.message);
//     });
//   });
// });


document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('product-form');
  let submitting = false;

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    submitting = true;

    const formData = new FormData(form);

    fetch('http://localhost:8080/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData)
    })
    .then(response => {
      submitting = false;

      if (!response.ok) {
        throw new Error('Erro ao cadastrar produto: ' + response.statusText);
      }
      alert('Produto cadastrado com sucesso!');
      return response.json(); // Retorna os dados do backend como JSON
    })
    .then(data => {
      displayProductData(data); // Chama a função para exibir os dados
      form.reset(); // Limpa os campos do formulário
    })
    .catch(error => {
      submitting = false;
      alert('Erro ao cadastrar produto: ' + error.message);
    });
  });

  function displayProductData(data) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Cria linhas na tabela com as informações retornadas do backend
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const tr = document.createElement('tr');
        const tdKey = document.createElement('td');
        const tdValue = document.createElement('td');

        tdKey.textContent = key;
        tdValue.textContent = data[key];

        tr.appendChild(tdKey);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
      }
    }

    // Limpa a tabela existente, se houver
    const existingTable = document.getElementById('product-data-table');
    if (existingTable) {
      existingTable.parentNode.removeChild(existingTable);
    }

    // Adiciona a nova tabela abaixo do formulário
    table.appendChild(tbody);
    table.setAttribute('id', 'product-data-table');
    form.parentNode.insertBefore(table, form.nextSibling);
  }
});

