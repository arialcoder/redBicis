const express = require('express');
const router = express.Router();

const bicicletaController = require('../../controllers/api/bicicletaControllerAPI');

router.get('/', bicicletaController.bicicleta_list);
router.post('/create', bicicletaController.bicicleta_create);
router.delete('/delete', bicicletaController.bicicleta_delete);
router.post('/update/', bicicletaController.bicicletas_update);

module.exports = router;