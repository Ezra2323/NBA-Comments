const diaService = require('../services/diaDeJogoService.js');

class DiaDeJogoController {
  async getAll(req, res) {
    const dias = await diaService.getAll();
    res.json(dias);
  }

  async getById(req, res) {
    const dia = await diaService.getById(req.params.id);
    if (!dia) return res.status(404).json({ error: 'Dia não encontrado' });
    res.json(dia);
  }

  async create(req, res) {
    const novoDia = await diaService.create(req.body);
    res.status(201).json(novoDia);
  }

  async update(req, res) {
    try {
      const dia = await diaService.update(req.params.id, req.body);
      res.json(dia);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await diaService.delete(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new DiaDeJogoController();
