const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const veiculoRoutes = require('./src/routes/veiculoRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const locacaoRoutes = require('./src/routes/locacaoRoutes');

const app = express();
const PORT = 80;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/veiculos', veiculoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/locacoes', locacaoRoutes);

app.get('/', (req, res) => {
  res.send('API OrnellesRent Rodando. Acesse /api/veiculos');
});

app.listen(PORT, () => {
  console.log(`Servidor OrnellesRent rodando na porta ${PORT}`);
});