const express = require('express');
const router = express.Router();

const cors = require('cors'); 
const app = express();

const TimeController = require('../controllers/timeController');
const JogadorController = require('../controllers/jogadorController');
const UsuarioController = require('../controllers/usuarioController');
const DiaDeJogoController = require('../controllers/diaDeJogoController');
const ComentarioController = require('../controllers/comentarioController');

// Times
router.get('/times', TimeController.getAll);
router.post('/times', TimeController.create);

// Jogadores
router.get('/jogadores', JogadorController.getAll);
router.get('/jogadores/:id', JogadorController.getById);

router.get('/jogadores/time/nome/:timeNome', JogadorController.getByTeamName);
router.post('/jogadores', JogadorController.create);

// Usuários
router.get('/usuarios', UsuarioController.getAll);
router.get('/usuarios/:id', UsuarioController.getById);
router.post('/usuarios', UsuarioController.create);
router.post('/usuarios/login', UsuarioController.login);
// Dias de Jogo
router.get('/jogos', DiaDeJogoController.getAll);
router.get('/jogos/:id', DiaDeJogoController.getById);
router.post('/jogos', DiaDeJogoController.create);

// Comentários
router.get('/comentarios', ComentarioController.getAll);
router.get('/comentarios/dia/:id', ComentarioController.getByGameDay);
router.post('/comentarios', ComentarioController.create);

module.exports = router;
