const { Usuario } = require('../models');

class UsuarioService {
  async getAll() {
    return Usuario.findAll();
  }

  async getById(id) {
    return Usuario.findByPk(id);
  }

  async create(data) {
    return Usuario.create(data);
  }

  async update(id, data) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');
    return usuario.update(data);
  }

  async delete(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');
    return usuario.destroy();
  }
}

module.exports = new UsuarioService();
