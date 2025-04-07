const DiaDeJogo = require('../models/diaDeJogo');
const Time = require('../models/time');

const DiaDeJogoService = {
  async getAll() {
    return await DiaDeJogo.findAll({
      include: [
        { model: Time, as: 'time1' },
        { model: Time, as: 'time2' }
      ]
    });
  },

  async create(data) {
    return await DiaDeJogo.create(data);
  },

  async getById(id) {
    return await DiaDeJogo.findByPk(id, {
      include: [
        { model: Time, as: 'time1' },
        { model: Time, as: 'time2' }
      ]
    });
  }
};

module.exports = DiaDeJogoService;
