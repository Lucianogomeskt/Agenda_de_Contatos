// Pegar os elementos do formulário
const form = document.getElementById('form-contato');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const idadeInput = document.getElementById('idade');
const mensagemDiv = document.getElementById('mensagem');

// Obter o ID da URL (ex: editar.html?id=5)
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

console.log("userId");

if (!userId) {
  mensagemDiv.textContent = 'ID do contato não informado.';
  mensagemDiv.style.color = 'red';
  form.style.display = 'none'; // esconde o formulário
} else {
  // Buscar os dados do contato para preencher os campos
  fetch(`http://localhost:3000/usuarios/${userId}`)
    .then(response => response.json())
    .then(usuario => {
      nomeInput.value = usuario.name;
      emailInput.value = usuario.email;
      idadeInput.value = usuario.age;
    })
    .catch(error => {
      console.error('Erro ao carregar contato:', error);
      mensagemDiv.textContent = 'Erro ao carregar dados do contato.';
      mensagemDiv.style.color = 'red';
    });
}

// Enviar atualização ao clicar em "Salvar"
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = nomeInput.value;
  const email = emailInput.value;
  const age = parseInt(idadeInput.value);

  try {
    const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, age })
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar contato');
    }

    mensagemDiv.textContent = 'Contato atualizado com sucesso!';
    mensagemDiv.style.color = 'green';

    // Redirecionar de volta para a agenda após 2 segundos
    setTimeout(() => {
      window.location.href = 'agenda.html';
    }, 2000);
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    mensagemDiv.textContent = 'Erro ao atualizar o contato.';
    mensagemDiv.style.color = 'red';
  }
});
