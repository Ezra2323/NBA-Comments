const express = require('express');
const router = express.Router();

// Importar todos os controllers
const JogadorController = require('../Controllers/jogadoresController.js');
const TimeController = require('../Controllers/timeController.js');
const UsuarioController = require('../Controllers/usuarioController.js');
const ComentarioController = require('../Controllers/comentarioController.js');
const DiaDeJogoController = require('../Controllers/diaDeJogoController.js');


// Rotas para Jogador
router.get('/jogadores', JogadorController.getAll);
router.get('/jogadores/:id', JogadorController.getById);
router.post('/jogadores', JogadorController.create);
router.put('/jogadores/:id', JogadorController.update);
router.delete('/jogadores/:id', JogadorController.delete);

// Rotas para Time
router.get('/times', TimeController.getAll);
router.get('/times/:nome', TimeController.getByName);
router.post('/times', TimeController.create);
router.put('/times/:nome', TimeController.update);
router.delete('/times/:nome', TimeController.delete);

// Rotas para Usuario
router.get('/usuarios', UsuarioController.getAll);
router.get('/usuarios/:id', UsuarioController.getById);
router.post('/usuarios', UsuarioController.create);
router.put('/usuarios/:id', UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.delete);

// Rotas para Comentario
router.get('/comentarios', ComentarioController.getAll);
router.get('/comentarios/:id', ComentarioController.getById);
router.post('/comentarios', ComentarioController.create);
router.put('/comentarios/:id', ComentarioController.update);
router.delete('/comentarios/:id', ComentarioController.delete);

// Rotas para Dia de Jogo
router.get('/dias', DiaDeJogoController.getAll);
router.get('/dias/:id', DiaDeJogoController.getById);
router.post('/dias', DiaDeJogoController.create);
router.put('/dias/:id', DiaDeJogoController.update);
router.delete('/dias/:id', DiaDeJogoController.delete);



module.exports = router;
