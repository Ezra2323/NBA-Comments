const { Comentario } = require('../models');

class ComentarioService {
  async getAll() {
    return Comentario.findAll();
  }

  async getById(id) {
    return Comentario.findByPk(id);
  }

  async create(data) {
    return Comentario.create(data);
  }

  async update(id, data) {
    const comentario = await Comentario.findByPk(id);
    if (!comentario) throw new Error('Comentário não encontrado');
    return comentario.update(data);
  }

  async delete(id) {
    const comentario = await Comentario.findByPk(id);
    if (!comentario) throw new Error('Comentário não encontrado');
    return comentario.destroy();
  }
}

module.exports = new ComentarioService();
