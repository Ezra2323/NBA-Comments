const { Time } = require('../models');

class TimeService {
  async getAll() {
    return Time.findAll();
  }

  async getByName(nome) {
    return Time.findByPk(nome);
  }

  async create(data) {
    return Time.create(data);
  }

  async update(nome, data) {
    const time = await Time.findByPk(nome);
    if (!time) throw new Error('Time não encontrado');
    return time.update(data);
  }

  async delete(nome) {
    const time = await Time.findByPk(nome);
    if (!time) throw new Error('Time não encontrado');
    return time.destroy();
  }
}

module.exports = new TimeService();
