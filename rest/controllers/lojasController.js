const lojas = require('../../src/models/lojas');

exports.cadastrarLoja = (req, res) => {
  const { nome, endereco } = req.body;
  if (!nome || !endereco) {
    return res.status(400).json({ mensagem: 'Nome e endereço são obrigatórios' });
  }
  const novaLoja = { id: lojas.length + 1, nome, endereco };
  lojas.push(novaLoja);
  res.status(201).json(novaLoja);
};

exports.listarLojas = (req, res) => {
  res.json(lojas);
};
