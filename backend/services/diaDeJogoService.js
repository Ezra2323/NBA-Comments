const { DiaDeJogo } = require('../models');

class DiaDeJogoService {
  async getAll() {
    return DiaDeJogo.findAll();
  }

  async getById(id) {
    return DiaDeJogo.findByPk(id);
  }

  async create(data) {
    return DiaDeJogo.create(data);
  }

  async update(id, data) {
    const dia = await DiaDeJogo.findByPk(id);
    if (!dia) throw new Error('Dia de jogo não encontrado');
    return dia.update(data);
  }

  async delete(id) {
    const dia = await DiaDeJogo.findByPk(id);
    if (!dia) throw new Error('Dia de jogo não encontrado');
    return dia.destroy();
  }
}

module.exports = new DiaDeJogoService();
