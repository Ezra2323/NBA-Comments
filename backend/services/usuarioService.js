const Usuario = require('../models/usuario');

const UsuarioService = {
  async getAll() {
    return await Usuario.findAll();
  },

  async create(data) {
    return await Usuario.create(data);
  },

  async getById(id) {
    return await Usuario.findByPk(id);
  }
};

module.exports = UsuarioService;
