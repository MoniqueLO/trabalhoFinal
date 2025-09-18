const request = require('supertest');
const createApp = require('./graphqlServer');
const usuarios = require('../src/models/usuarios');
const lojas = require('../src/models/lojas');
const bcrypt = require('bcryptjs');
const { expect } = require('chai');

describe('Testes GraphQL - Lojas e Autenticação', function () {
  this.timeout(10000);
  let token;
  let app;

  before(async function () {
    const senhaHash = await bcrypt.hash('123456', 8);
    usuarios.push({ id: 1, nome: 'teste', senha: senhaHash });
    app = await createApp();
  });

  it('Deve fazer login e receber token', async function () {
    const query = `mutation { login(nome: "teste", senha: "123456") { id nome token } }`;
    const res = await request(app)
      .post('/graphql')
      .send({ query });
    expect(res.body.data.login.token).to.be.a('string');
    token = res.body.data.login.token;
  });

  it('Deve cadastrar uma loja', async function () {
    const query = `mutation { cadastrarLoja(token: "${token}", nome: "Loja GraphQL", endereco: "Rua 1") { id nome endereco } }`;
    const res = await request(app)
      .post('/graphql')
      .send({ query });
    expect(res.body.data.cadastrarLoja.nome).to.equal('Loja GraphQL');
  });

  it('Deve listar lojas', async function () {
    const query = `query { lojas(token: "${token}") { id nome endereco } }`;
    const res = await request(app)
      .post('/graphql')
      .send({ query });
    expect(res.body.data.lojas).to.be.an('array');
    expect(res.body.data.lojas.length).to.be.greaterThan(0);
  });

  it('Deve recusar acesso sem token', async function () {
    const query = `query { lojas(token: "token_invalido") { id nome endereco } }`;
    const res = await request(app)
      .post('/graphql')
      .send({ query });

    expect(res.body.errors).to.exist;
  });
});
