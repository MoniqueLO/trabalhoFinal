const sinon = require('sinon');
const { expect } = require('chai');
const lojas = require('../../src/models/lojas');
const lojasRoutes = require('../routes/lojas');
const express = require('express');
const request = require('supertest');

describe('Controller de lojas', () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(express.json());
    // sempre insere um token válido
    app.use((req, res, next) => {
      req.headers['authorization'] = 'Bearer ' + gerarTokenTeste();
      next();
    });
    app.use('/lojas', lojasRoutes);
  });

  it('deve cadastrar loja (controller)', async () => {
    const res = await request(app)
      .post('/lojas')
      .set('Authorization', 'Bearer ' + gerarTokenTeste())
      .send({ nome: 'Loja Controller', endereco: 'Rua Controller' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('nome', 'Loja Controller');
  });

  it('deve validar campos obrigatórios', async () => {
    const res = await request(app)
      .post('/lojas')
      .set('Authorization', 'Bearer ' + gerarTokenTeste())
      .send({ nome: '' });
    expect(res.status).to.equal(400);
  });
});

// Função para gerar token válido para os testes
const userService = require('../../src/services/userService');
function gerarTokenTeste() {
  return userService.autenticar('admin', '123456').token;
}
