const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const lojas = require('../src/models/lojas');
const usuarios = require('../src/models/usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = 'segredo123';

const typeDefs = gql`
  type Loja {
    id: ID!
    nome: String!
    endereco: String!
  }
  type Usuario {
    id: ID!
    nome: String!
    token: String
  }
  type Query {
    lojas(token: String!): [Loja]
  }
  type Mutation {
    login(nome: String!, senha: String!): Usuario
    cadastrarLoja(token: String!, nome: String!, endereco: String!): Loja
  }
`;

const resolvers = {
  Query: {
    lojas: (_, { token }) => {
      try {
        jwt.verify(token, SECRET);
        return lojas;
      } catch {
        throw new Error('Token inválido');
      }
    }
  },
  Mutation: {
    login: async (_, { nome, senha }) => {
      const usuario = usuarios.find(u => u.nome === nome);
      if (!usuario) throw new Error('Usuário ou senha inválidos');
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) throw new Error('Usuário ou senha inválidos');
      const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, SECRET, { expiresIn: '1h' });
      return { id: usuario.id, nome: usuario.nome, token };
    },
    cadastrarLoja: (_, { token, nome, endereco }) => {
      try {
        jwt.verify(token, SECRET);
      } catch {
        throw new Error('Token inválido');
      }
      if (!nome || !endereco) throw new Error('Nome e endereço são obrigatórios');
      const novaLoja = { id: lojas.length + 1, nome, endereco };
      lojas.push(novaLoja);
      return novaLoja;
    }
  }
};


const createApp = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  return app;
};

if (require.main === module) {
  createApp().then(app => {
    app.listen(4000, () => {
      console.log('Servidor GraphQL rodando em http://localhost:4000/graphql');
    });
  });
}

module.exports = createApp;
