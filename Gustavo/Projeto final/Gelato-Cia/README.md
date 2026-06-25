# 🍦 API Sorveteria — Gelato & Cia

API REST do projeto **Gelato & Cia**, construída com **JSON Server**. Responsável por fornecer e armazenar os dados da sorveteria (sabores, pedidos, opcionais e status), consumidos pelo front-end em Vue.js.

🔗 **API em produção:** https://api-sorveteria-ml4z.onrender.com

🖥️ **Front-end (Vue):** https://gelato-cia.vercel.app

📦 **Repositório do front:** https://github.com/gustadev06/Gelato-Cia

---

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/)
- [JSON Server](https://github.com/typicode/json-server)
- Deploy: [Render](https://render.com/)

---

## 📂 Estrutura do projeto

```
api-sorveteria/
├── db.json          # "Banco de dados" com sabores, pedidos, opcionais, etc.
├── index.js         # Servidor JSON Server configurado para produção
├── package.json
└── .gitignore
```

O `index.js` configura o JSON Server para usar a porta definida pelo ambiente
(`process.env.PORT`), o que é necessário para o deploy no Render:

```js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server rodando na porta ${port}`);
});
```

---

## 🔌 Endpoints principais

> A lista completa de recursos é definida pelas chaves do arquivo `db.json`.
> Os principais utilizados pelo front são:

| Método | Rota        | Descrição                          |
|--------|-------------|------------------------------------|
| GET    | `/menu`     | Lista os sabores de sorvete        |
| GET    | `/pedidos`  | Lista os pedidos realizados        |
| POST   | `/pedidos`  | Cria um novo pedido                |
| PATCH  | `/pedidos/:id` | Atualiza o status de um pedido  |
| DELETE | `/pedidos/:id` | Remove um pedido                |

**Exemplo:** `GET https://api-sorveteria-ml4z.onrender.com/menu`

---

## 🚀 Como rodar localmente

Pré-requisito: ter o [Node.js](https://nodejs.org/) instalado.

```bash
# 1. Clonar o repositório
git clone https://github.com/gustadev06/api-sorveteria.git

# 2. Entrar na pasta
cd api-sorveteria

# 3. Instalar as dependências
npm install

# 4. Iniciar o servidor
node index.js
```

A API ficará disponível em `http://localhost:3000`.

---

## ⚠️ Observação sobre o plano gratuito (Render)

O serviço está hospedado no plano **Free** do Render. Por isso, após um período
de inatividade, a instância "hiberna" e a **primeira requisição pode levar até
~50 segundos** para responder (o servidor precisa "acordar"). As requisições
seguintes funcionam normalmente.

---

## 👤 Autor

Desenvolvido por **Gustavo (gustadev06)** como parte de um projeto acadêmico de
Engenharia de Software.
