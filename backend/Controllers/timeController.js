const timeService = require('../services/timeService.js');

class TimeController {
  async getAll(req, res) {
    const times = await timeService.getAll();
    res.json(times);
  }

  async getByName(req, res) {
    const time = await timeService.getByName(req.params.nome);
    if (!time) return res.status(404).json({ error: 'Time não encontrado' });
    res.json(time);
  }

  async create(req, res) {
    const novoTime = await timeService.create(req.body);
    res.status(201).json(novoTime);
  }

  async update(req, res) {
    try {
      const time = await timeService.update(req.params.nome, req.body);
      res.json(time);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await timeService.delete(req.params.nome);
      res.status(204).end();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new TimeController();
