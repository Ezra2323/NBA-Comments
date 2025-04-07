const JogadorService = require('../services/jogadorService');
const Time = require('../models/time'); // Adicione esta importação

const JogadorController = {
  async getAll(req, res) {
    try {
      const jogadores = await JogadorService.getAll();
      res.json(jogadores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const novo = await JogadorService.create(req.body);
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const jogador = await JogadorService.getById(req.params.id);
      jogador ? res.json(jogador) : res.status(404).send("Jogador não encontrado");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Método atualizado para buscar por nome do time
  async getByTeamName(req, res) {
    try {
      const jogadores = await JogadorService.getByTeamName(req.params.timeNome);
      res.json(jogadores);
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
      res.status(500).json({ 
        error: 'Erro interno ao buscar jogadores',
        details: error.message 
      });
    }
  }
};

module.exports = JogadorController;