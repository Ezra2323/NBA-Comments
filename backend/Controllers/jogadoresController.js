const jogadorService = require('../services/jogadorService.js');

class JogadorController {
  async getAll(req, res) {
    const jogadores = await jogadorService.getAll();
    res.json(jogadores);
  }

  async getById(req, res) {
    const jogador = await jogadorService.getById(req.params.id);
    if (!jogador) return res.status(404).json({ error: 'Jogador não encontrado' });
    res.json(jogador);
  }

  async create(req, res) {
    const novoJogador = await jogadorService.create(req.body);
    res.status(201).json(novoJogador);
  }

  async update(req, res) {
    try {
      const jogador = await jogadorService.update(req.params.id, req.body);
      res.json(jogador);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await jogadorService.delete(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new JogadorController();
