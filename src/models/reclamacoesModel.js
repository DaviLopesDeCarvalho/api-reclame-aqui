const mongoose = require('mongoose');

const reclamacaoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  empresa: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pendente', 'Em análise', 'Resolvida'], 
    default: 'Pendente' 
  },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reclamacao', reclamacaoSchema);