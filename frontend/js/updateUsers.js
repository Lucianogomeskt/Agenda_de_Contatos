import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function atualizarUsuarios() {
  try {
    const users = await prisma.user.findMany();

    await Promise.all(users.map(async (user) => {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          age: undefined, // Remove o campo "age"
          phone: "000-000-0000" // Adiciona um telefone padrão
        },
      });
    }));

    console.log("Todos os usuários foram atualizados com telefone e sem idade!");
  } catch (error) {
    console.error("Erro ao atualizar usuários:", error);
  } finally {
    await prisma.$disconnect();
  }
}

atualizarUsuarios();
