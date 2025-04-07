const UsuarioService = require('../services/usuarioService');
const Usuario = require('../models/usuario');
const { Op } = require('sequelize'); // Importe o Operador do Sequelize

const UsuarioController = {
  async getAll(req, res) {
    try {
      const usuarios = await UsuarioService.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { nome, nickname, senha } = req.body;

      // Verifica se nome ou nickname já existem
      const usuarioExistente = await Usuario.findOne({
        where: {
          [Op.or]: [
            { nome },
            { nickname }
          ]
        }
      });

      if (usuarioExistente) {
        let mensagem = '';
        if (usuarioExistente.nome === nome) {
          mensagem = 'Este nome já está em uso';
        } else {
          mensagem = 'Este nickname já está em uso';
        }
        return res.status(400).json({ error: mensagem });
      }

      const novoUsuario = await UsuarioService.create({ nome, nickname, senha });
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const usuario = await UsuarioService.getById(req.params.id);
      usuario ? res.json(usuario) : res.status(404).send("Usuário não encontrado");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { nickname, senha } = req.body;
      const usuario = await Usuario.findOne({ where: { nickname } });
      
      if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      
      res.json({
        id: usuario.id,
        nickname: usuario.nickname,
        nome: usuario.nome
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UsuarioController;