const express = require('express');
const router = express.Router();
const controller = require('../controllers/reclamacoesController');

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);


module.exports = router;