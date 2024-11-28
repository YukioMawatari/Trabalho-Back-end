const express = require('express');
const Participante = require('../models/Participante');
const router = express.Router();

// Criar participante
router.post('/', async (req, res) => {
    try {
        const participante = new Participante(req.body);
        const savedParticipante = await participante.save();
        res.status(201).json(savedParticipante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });

// Listar participantes
router.get('/', async (req, res) => {
    try {
        const participantes = await Participante.find().populate('eventoId');
        res.json(participantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

// Atualizar participante
router.put('/:id', async (req, res) => {
    try {
        const participante = await Participante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(participante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    });

// Deletar participante
router.delete('/:id', async (req, res) => {
    try {
        await Participante.findByIdAndDelete(req.params.id);
        res.json({ message: 'Participante deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
