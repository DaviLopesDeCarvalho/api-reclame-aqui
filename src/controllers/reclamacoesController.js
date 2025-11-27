const reclamacoesModel = require('../models/reclamacoesModel');

async function listar(req, res) {
  const lista = await reclamacoesModel.find().populate('usuarioId', 'email');
  res.status(200).json(lista);
}

async function buscarPorId(req, res) {
  try {
    const item = await reclamacoesModel.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Reclamação não encontrada' });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ msg: 'ID inválido' });
  }
}

module.exports = { listar, buscarPorId};