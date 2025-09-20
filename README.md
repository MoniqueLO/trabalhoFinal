# API de Cadastro de Lojas (REST e GraphQL)

Este projeto é uma API para cadastro de lojas, com autenticação, disponível em REST e GraphQL. 

## Tecnologias
- Node.js
- Express
- GraphQL
- JWT 
- Mocha, Chai, Supertest, Sinon 

## Como rodar

1. Instale as dependências:
   ```npm install```
2. Inicie o servidor REST:
   ```npm start```
3. Inicie o servidor GraphQL (opcional):
   ```npm run start:graphql```
4. Para rodar os testes REST:
   ```npm test```
5. Para rodar os testes GraphQL:
   ```npm run test:graphql```

## Endpoints principais (REST)
- `POST /auth/login` — Autenticação (envie nome e senha)
- `POST /lojas` — Cadastrar loja (requer token)
- `GET /lojas` — Listar lojas (requer token)


## Endpoint GraphQL
- `POST /graphql`

### Exemplo de query para listar lojas

```graphql
query ExampleQuery($token: String!) {
  lojas(token: $token) {
    id
    nome
    endereco
  }
}
```

### Exemplos de mutations GraphQL

**Login:**
```graphql
mutation {
  login(nome: "teste", senha: "123456") {
    id
    nome
    token
  }
}
```

**Cadastrar loja:**
```graphql
mutation {
  cadastrarLoja(token: "SEU_TOKEN", nome: "Loja GraphQL", endereco: "Rua 1") {
    id
    nome
    endereco
  }
}
```

**Listar lojas:**
```graphql
query {
  lojas(token: "SEU_TOKEN") {
    id
    nome
    endereco
  }
}
```

## Usuário de exemplo
- nome: `teste`
- senha: `123456`

