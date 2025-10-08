const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

router.get('/', veiculoController.listarVeiculos);  
router.post('/', veiculoController.cadastrarVeiculo);   


router.get('/busca', veiculoController.buscarVeiculos);

module.exports = router;