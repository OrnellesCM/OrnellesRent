// src/routes/veiculoRoutes.js

const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

// Rotas CRUD
router.get('/', veiculoController.listarVeiculos);      // GET /api/veiculos
router.post('/', veiculoController.cadastrarVeiculo);   // POST /api/veiculos
// ... Adicionar rotas PUT (modificar) e DELETE (excluir)

// Rota de Busca com Filtros (pode ser um endpoint separado ou usar o GET principal)
router.get('/busca', veiculoController.buscarVeiculos); // GET /api/veiculos/busca?marca=...

module.exports = router;