// server.js

const express = require('express');
const bodyParser = require('body-parser');

// Importa as rotas
const veiculoRoutes = require('./src/routes/veiculoRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes'); // A ser criado
const locacaoRoutes = require('./src/routes/locacaoRoutes'); // A ser criado

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Para processar dados JSON no corpo da requisição

// --- Rotas API ---
app.use('/api/veiculos', veiculoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/locacoes', locacaoRoutes);

// Rota principal (para testar se o servidor está rodando)
app.get('/', (req, res) => {
  res.send('API OrnellesRent Rodando. Acesse /api/veiculos');
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor OrnellesRent rodando na porta ${PORT}`);
});