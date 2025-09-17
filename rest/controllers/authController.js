const userService = require('../../src/services/userService');

exports.login = (req, res) => {
  const { nome, senha } = req.body;
  const result = userService.autenticar(nome, senha);
  if (!result) {
    return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
  }
  res.json(result);
};
