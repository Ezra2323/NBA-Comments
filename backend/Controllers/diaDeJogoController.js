const DiaDeJogoService = require('../services/diaDeJogoService');

const DiaDeJogoController = {
  async getAll(req, res) {
    const jogos = await DiaDeJogoService.getAll();
    res.json(jogos);
  },

  async create(req, res) {
    const novo = await DiaDeJogoService.create(req.body);
    res.status(201).json(novo);
  },

  async getById(req, res) {
    const jogo = await DiaDeJogoService.getById(req.params.id);
    jogo ? res.json(jogo) : res.status(404).send("Jogo não encontrado");
  }
};

module.exports = DiaDeJogoController;
