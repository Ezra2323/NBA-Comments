const Jogador = require('../models/jogador');
const Time = require('../models/time'); // Adicione esta importação

const JogadorService = {
  async getAll() {
    return await Jogador.findAll({
      include: [{
        model: Time,
        as: 'time',
        attributes: ['nome'] // Retorna apenas o nome do time
      }]
    });
  },

  async create(jogadorData) {
    return await Jogador.create(jogadorData);
  },

  async getById(id) {
    return await Jogador.findByPk(id, {
      include: [{
        model: Time,
        as: 'time',
        attributes: ['nome']
      }]
    });
  },

  // Método otimizado para buscar por nome do time
  async getByTeamName(timeNome) {
    return await Jogador.findAll({
      include: [{
        model: Time,
        as: 'time',
        where: { nome: timeNome },
        attributes: [] // Apenas filtra, não retorna dados do time
      }],
      order: [
        ['num_jogador', 'ASC'],
        ['nome', 'ASC']
      ]
    });
  }
};

module.exports = JogadorService;