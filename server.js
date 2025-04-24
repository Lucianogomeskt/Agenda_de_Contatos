import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'; // importante para o front funcionar

const prisma = new PrismaClient();
const app = express();

app.use(cors()); // permite conexões do frontend
app.use(express.json());

// Criar um usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const novoUsuario = await prisma.user.create({
      data: {
        name,
        email,
        age
      }
    });

    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error('Erro ao criar usuário:', err); // Mostra o erro no terminal
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

// Listar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

// Atualizar um usuário
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const { id } = req.params;

    const usuarioAtualizado = await prisma.user.update({
      where: { id },
      data: { name, email, age }
    });

    res.status(200).json(usuarioAtualizado);
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

// Buscar usuário por ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.user.findUnique({
      where: { id: id }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


// Deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
