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

async function criar(req, res) {
  const { titulo, descricao, empresa } = req.body;
  if (!titulo || !descricao || !empresa) return res.status(422).json({ msg: 'Dados obrigatórios faltando' });

  try {
    const nova = await reclamacoesModel.create({
      titulo, descricao, empresa,
      usuarioId: req.usuario.id
    });
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao criar' });
  }
}

async function atualizar(req, res) {
  try {
    const item = await reclamacoesModel.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Não encontrada' });

    if (item.usuarioId.toString() !== req.usuario.id) return res.status(403).json({ msg: 'Acesso negado' });

    const atualizado = await reclamacoesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(atualizado);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao atualizar' });
  }
}

async function atualizarParcial(req, res) {
  try {
    const item = await reclamacoesModel.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Não encontrada' });

    if (item.usuarioId.toString() !== req.usuario.id) return res.status(403).json({ msg: 'Acesso negado' });
    Object.assign(item, req.body);
    await item.save();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao atualizar parcialmente' });
  }
}
async function remover(req, res) {
  try {
    const item = await reclamacoesModel.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Não encontrada' });

    if (item.usuarioId.toString() !== req.usuario.id) return res.status(403).json({ msg: 'Acesso negado' });

    await reclamacoesModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao deletar' });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, atualizarParcial, remover };