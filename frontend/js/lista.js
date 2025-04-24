const container = document.getElementById('lista-contatos');

fetch('http://localhost:3000/usuarios')
  .then(response => response.json())
  .then(usuarios => {
    if (usuarios.length === 0) {
      container.innerHTML = '<p>Nenhum contato encontrado.</p>';
      return;
    }

    usuarios.forEach(usuario => {
      const card = document.createElement('div');
      card.classList.add('contato-card');

      card.innerHTML = `
        <h3>${usuario.name}</h3>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Idade:</strong> ${usuario.age}</p>
         <a href="editar.html?id=${usuario.id}">Editar</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar usuários:', error);
    container.innerHTML = '<p>Erro ao carregar contatos.</p>';
  });


 