// src/routes/clienteRoutes.js

const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rotas de Clientes (CRUD)
router.post('/', clienteController.cadastrarCliente);   // POST /api/clientes
router.get('/', clienteController.listarClientes);       // GET /api/clientes
router.put('/:id', clienteController.modificarCliente); // PUT /api/clientes/123
router.delete('/:id', clienteController.excluirCliente);// DELETE /api/clientes/123

// Rota de Funcionalidade
// Onde :id é o ID do cliente que você deseja ver o histórico
router.get('/:id/historico', clienteController.mostrarHistorico); 

module.exports = router;