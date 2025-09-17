const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('Testes de lojas (external)', () => {
  let token;
  before(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ nome: 'admin', senha: '123456' });
    token = res.body.token;
  });

  it('deve cadastrar uma loja', async () => {
    const res = await request(app)
      .post('/lojas')
      .set('Authorization', 'Bearer ' + token)
      .send({ nome: 'Loja Teste', endereco: 'Rua 1' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('nome', 'Loja Teste');
  });

  it('deve listar lojas', async () => {
    const res = await request(app)
      .get('/lojas')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('deve exigir autenticação', async () => {
    const res = await request(app)
      .get('/lojas');
    expect(res.status).to.equal(401);
  });
});
