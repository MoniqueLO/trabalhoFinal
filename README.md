# API de Cadastro de Lojas

Este projeto é uma API REST para cadastro de lojas, com autenticação de usuário.

## Tecnologias
- Node.js
- Express
- JWT (autenticação)
- Mocha, Chai, Supertest, Sinon (testes)

## Como rodar

1. Instale as dependências:
   ```
npm install
   ```
2. Inicie o servidor:
   ```
npm start
   ```
3. Para rodar os testes:
   ```
npx mocha
   ```

## Endpoints principais
- `POST /auth/login` — Autenticação (envie nome e senha)
- `POST /lojas` — Cadastrar loja (requer token)
- `GET /lojas` — Listar lojas (requer token)

## Usuário de exemplo
- nome: `admin`
- senha: `123456`

## Observações
- O armazenamento é em memória (ao reiniciar, os dados somem).
