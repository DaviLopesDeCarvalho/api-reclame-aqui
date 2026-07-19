const usuariosModel = require('../models/usuariosModel');
const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');

async function criar(req, res) {
  try {
    const { email, senha } = req.body;
    if (await usuariosModel.findOne({ email })) {
      return res.status(422).json({ msg: 'Email já cadastrado' });
    }
    const novoUsuario = await usuariosModel.create({ email, senha: cifrarSenha(senha) });
    res.status(201).json({ _id: novoUsuario._id, email: novoUsuario.email });
  } catch (err) {
    res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
  }
}

async function entrar(req, res) {
  const { usuario, senha } = req.body;
  const user = await usuariosModel.findOne({ email: usuario });

  if (user && compararSenha(senha, user.senha)) {
    const token = gerarToken({ id: user._id, email: user.email });
    return res.status(200).json({ token });
  }
  res.status(401).json({ msg: 'Credenciais inválidas' });
}

module.exports = { criar, entrar };