const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/', clienteController.cadastrarCliente);  
router.get('/', clienteController.listarClientes);      
router.put('/:id', clienteController.modificarCliente); 
router.delete('/:id', clienteController.excluirCliente);

router.get('/:id/historico', clienteController.mostrarHistorico); 

module.exports = router;