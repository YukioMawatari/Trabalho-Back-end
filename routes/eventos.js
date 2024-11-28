const express = require('express');
const Evento = require('../models/Evento');
const router = express.Router();

// Função para validar IDs do MongoDB
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Criar evento
router.post('/', async (req, res) => {
    try {
        const { nome, data, local, descricao } = req.body;

        // Validação de campos obrigatórios
        if (!nome || !data || !local) {
            return res.status(400).json({
                error: 'Os campos "nome", "data" e "local" são obrigatórios.',
            });
        }

        // Validação do formato de data
        if (isNaN(Date.parse(data))) {
            return res.status(400).json({
                error: 'O campo "data" deve conter uma data válida.',
            });
        }

        const evento = new Evento({ nome, data, local, descricao });
        const savedEvento = await evento.save();
        res.status(201).json(savedEvento);
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao criar evento',
            detalhes: error.message,
        });
    }
});

// Listar eventos
router.get('/', async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao listar eventos',
            detalhes: error.message,
        });
    }
});

// Atualizar evento
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validar ID
        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const { nome, data, local, descricao } = req.body;

        // Validação de campos
        if (data && isNaN(Date.parse(data))) {
            return res.status(400).json({
                error: 'O campo "data" deve conter uma data válida.',
            });
        }

        const evento = await Evento.findByIdAndUpdate(
            id,
            { nome, data, local, descricao },
            { new: true }
        );

        if (!evento) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }

        res.json(evento);
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao atualizar evento',
            detalhes: error.message,
        });
    }
});

// Deletar evento
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validar ID
        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const evento = await Evento.findByIdAndDelete(id);

        if (!evento) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }

        res.json({ message: 'Evento deletado com sucesso' });
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao deletar evento',
            detalhes: error.message,
        });
    }
});

module.exports = router;
