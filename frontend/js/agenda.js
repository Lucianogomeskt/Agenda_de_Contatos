document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contato");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const idade = document.getElementById("idade").value.trim();
  
      if (!nome || !email || !idade) {
        alert("Por favor, preencha todos os campos!");
        return;
      }
  
      fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nome,
          email: email,
          age: parseInt(idade)
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro na resposta da API");
        }
        return response.json();
      })
      .then(data => {
        alert("Contato cadastrado com sucesso!");
        form.reset();
        document.getElementById("mensagem").innerText = "Contato cadastrado com sucesso!";
      })
      .catch(error => {
        console.error("Erro ao enviar os dados:", error);
        alert("Erro ao cadastrar o contato.");
        document.getElementById("mensagem").innerText = "Erro ao conectar com a API.";
      });
    });
  });
  