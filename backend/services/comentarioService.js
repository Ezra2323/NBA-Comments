const Comentario = require('../models/comentario');
const Usuario = require('../models/usuario');
const DiaDeJogo = require('../models/diaDeJogo');

const ComentarioService = {
  async getAll() {
    return await Comentario.findAll({
      include: [
        { model: Usuario,
          attributes: ['id', 'nickname']
        },
        { model: DiaDeJogo }
      ]
    });
  },

  async getByGameDay(idDiaJogo) {
    return await Comentario.findAll({
      where: { id_dia_jogo: idDiaJogo },
      include: [
        { model: Usuario },
        { model: DiaDeJogo }
      ]
    });
  },

  async create(data) {
  console.log('📥 Dados recebidos para criar comentário:', data);
  return await Comentario.create(data);
}

};

module.exports = ComentarioService;