# 📢 API Reclame Aqui Clone

Este projeto é uma API RESTful desenvolvida com Node.js e Express para gerenciar reclamações de consumidores. O sistema permite o cadastro de usuários, autenticação via JWT, e operações completas de CRUD (Create, Read, Update, Delete/Patch) sobre as reclamações, garantindo que apenas o autor possa modificar seus dados.

O projeto segue padrões REST, arquitetura MVC e inclui documentação via Swagger e testes automatizados.

## 👥 Integrantes e Divisão de Tarefas

| Integrante                       | Função       | Responsabilidades (Issues)                                                                                                        |
| :------------------------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| _Davi Lopes de Carvalho_         | Arquiteto/DB | Infraestrutura (Setup, .env, Server), Modelagem de Dados (Mongoose Schemas), (GET).                                               |
| _Luiz Henrique Bayma Martins_    | Segurança    | Sistema de Autenticação (Login/Register), Criptografia e Middleware de Proteção JWT.                                              |
| _Gabriel Augusto Oliveira Souza_ | Backend Core | Desenvolvimento dos Controllers de CRUD - (POST), (PUT), (PATCH), (DELETE) , Rotas e Regras de Negócio (ex: permissão de edição). |
| _Davi Serlio Lopes De Souza_     | QA & Docs    | Desenvolvimento de Testes Automatizados (Jest/Supertest), Configuração do Swagger e Documentação.                                 |

---

## 🛠 Tecnologias Utilizadas

- _Node.js & Express_: Framework principal da API.
- _MongoDB & Mongoose_: Banco de dados NoSQL e ODM.
- _JWT (JSON Web Token)_: Autenticação segura sem estado (stateless).
- _BcryptJS_: Hashing de senhas.
- _Jest & Supertest_: Testes unitários e de integração.
- _Swagger UI_: Documentação interativa da API.

---

## 🚀 Como Rodar o Projeto

### 1. Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Git](https://git-scm.com/)

### 2. Instalação

Clone este repositório e instale as dependências:

```bash
git clone [https://github.com/SEU-USUARIO/projeto-reclame-aqui.git](https://github.com/SEU-USUARIO/projeto-reclame-aqui.git)
cd projeto-reclame-aqui
npm install

3. Configuração de Ambiente (.env)
Crie um arquivo chamado .env na raiz do projeto e configure as variáveis conforme o exemplo abaixo:

Snippet de código

PORT=3000
MONGODB_USER=seu_usuario_atlas
MONGODB_PASS=sua_senha_atlas
MONGODB_HOST=cluster0.xxxxx.mongodb.net
MONGODB_DBNAME=reclameaqui
JWT_SECRET=minha_chave_super_secreta
Nota: Se estiver usando um MongoDB local, ajuste a string de conexão no src/app.js ou configure as variáveis para apontar para localhost.

4. Execução
Para rodar a API em modo de desenvolvimento (com hot-reload):

Bash

npm run dev
O servidor iniciará em http://localhost:3000.

🧪 Como Rodar os Testes
O projeto possui uma suíte completa de testes de integração que valida desde a autenticação até as regras de negócio (ex: impedir que um usuário edite a reclamação de outro).

Para executar os testes:

Bash

npm test
O Jest irá rodar, conectar-se ao banco, realizar as operações e limpar os dados ao final.

📚 Documentação da API (Swagger)
Com o servidor rodando, acesse a documentação interativa para testar os endpoints manualmente:

👉 http://localhost:3000/api-docs

Resumo dos Endpoints
Auth

POST /auth/register: Cria um novo usuário.

POST /auth/login: Retorna o Token JWT.

Reclamações

GET /reclamacoes: Lista todas (Público).

GET /reclamacoes/{id}: Detalhes de uma reclamação (Público).

POST /reclamacoes: Cria nova reclamação (Requer Token).

PUT /reclamacoes/{id}: Atualiza reclamação completa (Requer Token + Dono).

PATCH /reclamacoes/{id}: Atualiza status/parcial (Requer Token + Dono).

DELETE /reclamacoes/{id}: Remove reclamação (Requer Token + Dono).
```
