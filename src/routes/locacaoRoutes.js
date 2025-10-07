// src/routes/locacaoRoutes.js

const express = require('express');
const router = express.Router();
const locacaoController = require('../controllers/locacaoController');

// Rotas de Locação
router.post('/', locacaoController.criarLocacao);           // POST /api/locacoes (Cria uma nova locação)
router.get('/ativas', locacaoController.listarLocacoesAtivas); // GET /api/locacoes/ativas
router.put('/:id/devolucao', locacaoController.finalizarLocacao); // PUT /api/locacoes/123/devolucao

// Outras rotas (GET por ID, GET todas, etc.) podem ser adicionadas aqui.

module.exports = router;