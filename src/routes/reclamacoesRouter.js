const express = require('express');
const router = express.Router();
const controller = require('../controllers/reclamacoesController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);


router.post('/', verificarToken, controller.criar);
router.put('/:id', verificarToken, controller.atualizar);
router.patch('/:id', verificarToken, controller.atualizarParcial);
router.delete('/:id', verificarToken, controller.remover);

module.exports = router;