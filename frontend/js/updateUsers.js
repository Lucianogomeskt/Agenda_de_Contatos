import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function atualizarIdades() {
  try {
    const users = await prisma.user.findMany();

    await Promise.all(users.map(async (user) => {
      await prisma.user.update({
        where: { id: user.id },
        data: { age: parseInt(user.age, 10) }
      });
    }));

    console.log("Todos os usuários foram atualizados!");
  } catch (error) {
    console.error("Erro ao atualizar usuários:", error);
  } finally {
    await prisma.$disconnect(); // Fecha a conexão com o banco
  }
}

// Chama a função
atualizarIdades();
