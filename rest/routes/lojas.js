const express = require('express');
const lojasController = require('../controllers/lojasController');
const userService = require('../../src/services/userService');

const router = express.Router();

function autenticarToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });
	const usuario = userService.verificarToken(token);
	if (!usuario) return res.status(403).json({ mensagem: 'Token inválido' });
	req.usuario = usuario;
	next();
}

router.post('/', autenticarToken, lojasController.cadastrarLoja);
router.get('/', autenticarToken, lojasController.listarLojas);

module.exports = router;
