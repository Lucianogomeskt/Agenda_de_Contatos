# 📒 Agenda de Contatos

Este projeto é uma aplicação simples de agenda de contatos que permite cadastrar, editar, listar e excluir contatos. Utiliza **Node.js**, **Prisma ORM** e **MongoDB** como banco de dados.

---

## ⚙️ Requisitos

Antes de começar, você precisa ter:

- [Node.js](https://nodejs.org/) instalado na versão **v22.14.0 ou superior**
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — Crie uma conta e veja como criar um cluster (referência no minuto 38:22): [Vídeo YouTube](https://www.youtube.com/watch?v=PyrMT0GA3sE&t=3413s)

---

## 🧰 Instruções de instalação (Node.js)

1. Instale a versão recomendada do Node.js (v22.14.0 ou superior).
2. Reinicie seu computador após a instalação.
3. Abra a pasta do projeto.
4. Execute o comando:

```bash
npm install
```

❗ Caso o comando `npm install` não funcione:

Verifique se as variáveis de ambiente estão configuradas corretamente:

- Acesse: Painel de Controle > Sistema > Configurações avançadas do sistema > Variáveis de Ambiente
- Verifique se o Node.js e npm estão presentes na variável `Path`.
- Se não estiverem, adicione os caminhos (exemplo):

```
C:\Program Files\nodejs\
```

Após adicionar, reinicie novamente o computador.

Execute `npm install` novamente.

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Lucianogomeskt/Agenda_de_Contatos
cd Agenda_de_Contatos
```

### 2. Instale as dependências

```bash
npm install
```

> Este comando instala todas as bibliotecas necessárias definidas no `package.json`.

### 3. Gere o Prisma Client

```bash
npx prisma generate
```

> Gera o cliente Prisma com base no `schema.prisma`.

### 4. Crie o arquivo `.env`

Na raiz do projeto, crie um arquivo chamado `.env` com o seguinte conteúdo:

```env
DATABASE_URL="mongodb+srv://<usuário>:<senha>@<cluster>.mongodb.net/<nome-do-banco>?retryWrites=true&w=majority"
```

Substitua:

- `<usuário>` pelo seu usuário do MongoDB
- `<senha>` pela sua senha
- `<cluster>` pela URL do seu cluster no MongoDB Atlas
- `<nome-do-banco>` pelo nome do banco, por exemplo: `agenda`

> O `.env` é usado para armazenar informações sensíveis de forma segura. A variável `DATABASE_URL` é utilizada pelo Prisma para se conectar ao banco MongoDB.

### 5. Execute o projeto

```bash
npm run dev
```

> Inicia o servidor em modo de desenvolvimento.

---

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- MongoDB (via Prisma ORM)
- HTML / CSS / JavaScript (frontend básico)
- Prisma ORM
