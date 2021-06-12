const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/api/usuarioControllerAPI');

router.get('/', usuarioController.usuarios_list);
router.get('/create', usuarioController.usuarios_create);
router.post('/reservar', usuarioController.usuario_reservar);


module.exports = router;