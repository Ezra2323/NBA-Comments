const ComentarioService = require('../services/comentarioService');

const ComentarioController = {
  async getAll(req, res) {
    try {
      const comentarios = await ComentarioService.getAll();
      res.json(comentarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getByGameDay(req, res) {
    try {
      const comentarios = await ComentarioService.getByGameDay(req.params.id);
      res.json(comentarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      console.log('📨 Requisição recebida:', req.body);
      const novoComentario = await ComentarioService.create(req.body);
      res.status(201).json(novoComentario);
    } catch (error) {
      console.error('❌ Erro ao criar comentário:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
};

module.exports = ComentarioController;