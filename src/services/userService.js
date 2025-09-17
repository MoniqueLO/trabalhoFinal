const usuarios = require('../models/usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = 'segredo123';

function encontrarUsuarioPorNome(nome) {
  return usuarios.find(u => u.nome === nome);
}

function autenticar(nome, senha) {
  const usuario = encontrarUsuarioPorNome(nome);
  if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
    const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, SECRET, { expiresIn: '1h' });
    return { token };
  }
  return null;
}

function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

module.exports = { autenticar, verificarToken, encontrarUsuarioPorNome, SECRET };
