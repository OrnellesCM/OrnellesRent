
const express = require('express');
const router = express.Router();
const locacaoController = require('../controllers/locacaoController');

router.post('/', locacaoController.criarLocacao);           
router.get('/ativas', locacaoController.listarLocacoesAtivas);
router.put('/:id/devolucao', locacaoController.finalizarLocacao);
module.exports = router;