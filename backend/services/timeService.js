const Time = require('../models/time');

const TimeService = {
  async getAll() {
    return await Time.findAll();
  },

  async create(data) {
    return await Time.create(data);
  }
};

module.exports = TimeService;
