const container = document.getElementById('lista-contatos');

fetch('http://localhost:3000/usuarios')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    return response.json();
  })
  .then(usuarios => {
    if (!Array.isArray(usuarios)) {
      throw new Error('Resposta da API não contém uma lista válida');
    }
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
        <p><strong>Telefone:</strong> ${usuario.phone}</p>
        <a href="editar.html?id=${usuario.id}" style="color: white; margin-right: 10px;">Editar</a>
        <button class="btn-excluir" data-id="${usuario.id}" style="background-color: red; color: white;">Excluir</button>
      `;

      // Botão de excluir com confirmação
      const btnExcluir = card.querySelector('.btn-excluir');
      btnExcluir.addEventListener('click', async () => {
        const confirmar = confirm(`Deseja realmente excluir ${usuario.name}?`);
        if (confirmar) {
          try {
            const response = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
              method: 'DELETE'
            });

            if (!response.ok) {
              throw new Error('Erro ao excluir contato');
            }

            alert('Contato excluído com sucesso!');
            card.remove(); // Remove o contato sem recarregar a página
          } catch (error) {
            console.error('Erro ao excluir:', error);
            alert('Erro ao excluir o contato.');
          }
        }
      });

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar usuários:', error);
    container.innerHTML = `<p style="color:red;">Erro ao carregar contatos. Tente novamente mais tarde.</p>`;
  });
