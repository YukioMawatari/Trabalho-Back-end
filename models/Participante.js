const mongoose = require('mongoose');

const ParticipanteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String },
    eventoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento', required: true },
});

module.exports = mongoose.model('Participante', ParticipanteSchema);
