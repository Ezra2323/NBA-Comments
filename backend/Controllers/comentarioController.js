const comentarioService = require('../services/comentarioService.js');

class ComentarioController {
  async getAll(req, res) {
    const comentarios = await comentarioService.getAll();
    res.json(comentarios);
  }

  async getById(req, res) {
    const comentario = await comentarioService.getById(req.params.id);
    if (!comentario) return res.status(404).json({ error: 'Comentário não encontrado' });
    res.json(comentario);
  }

  async create(req, res) {
    const novoComentario = await comentarioService.create(req.body);
    res.status(201).json(novoComentario);
  }

  async update(req, res) {
    try {
      const comentario = await comentarioService.update(req.params.id, req.body);
      res.json(comentario);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await comentarioService.delete(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new ComentarioController();
