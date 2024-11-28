const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventosRoutes = require('./routes/eventos');
const participantesRoutes = require('./routes/participantes');

const app = express();
const PORT = 3000;

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/gestao-eventos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/eventos', eventosRoutes);
app.use('/api/participantes', participantesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
