const { Jogador } = require('../models');

class JogadorService {
  async getAll() {
    return Jogador.findAll();
  }

  async getById(id) {
    return Jogador.findByPk(id);
  }

  async create(data) {
    return Jogador.create(data);
  }

  async update(id, data) {
    const jogador = await Jogador.findByPk(id);
    if (!jogador) throw new Error('Jogador não encontrado');
    return jogador.update(data);
  }

  async delete(id) {
    const jogador = await Jogador.findByPk(id);
    if (!jogador) throw new Error('Jogador não encontrado');
    return jogador.destroy();
  }
}

module.exports = new JogadorService();
