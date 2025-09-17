const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('Testes de autenticação', () => {
  it('deve retornar token com login correto', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ nome: 'admin', senha: '123456' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('deve dar erro com login incorreto', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ nome: 'admin', senha: 'errada' });
    expect(res.status).to.equal(401);
  });
});
