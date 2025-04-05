const usuarioService = require('../services/usuarioService.js');

class UsuarioController {
  async getAll(req, res) {
    const usuarios = await usuarioService.getAll();
    res.json(usuarios);
  }

  async getById(req, res) {
    const usuario = await usuarioService.getById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  }

  async create(req, res) {
    const novoUsuario = await usuarioService.create(req.body);
    res.status(201).json(novoUsuario);
  }

  async update(req, res) {
    try {
      const usuario = await usuarioService.update(req.params.id, req.body);
      res.json(usuario);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await usuarioService.delete(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new UsuarioController();
