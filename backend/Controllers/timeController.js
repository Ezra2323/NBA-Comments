const TimeService = require('../services/timeService');

const TimeController = {
  async getAll(req, res) {
    const times = await TimeService.getAll();
    res.json(times);
  },

  async create(req, res) {
    const novo = await TimeService.create(req.body);
    res.status(201).json(novo);
  }
};

module.exports = TimeController;
