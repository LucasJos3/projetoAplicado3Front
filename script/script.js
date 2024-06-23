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

//SCRIPT APONTAMENTO

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("report-form-complet");  

//   form.addEventListener("submit", function (event) {

//     const url = "http://localhost:8080/production";    
    
//     const pdfBlob = fetchPdf(url); // substitua pela URL do seu backend
//     openPdf(pdfBlob);
//   });   
// });

// async function fetchPdf(url) {
//   const response = fetch(url)
//   const data = await response.blob(); // Recebe o PDF como um Blob
//   return data;
// }

// // Função para criar uma URL para o PDF e abrir em uma nova janela
// function openPdf(pdfBlob) {
//   const url = URL.createObjectURL(pdfBlob); // Cria uma URL para o Blob
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'output.pdf'; // Nome do arquivo a ser baixado
//   link.click();// Abre a URL em uma nova janela
// }
