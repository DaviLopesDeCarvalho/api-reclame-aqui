require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(url)
  .then(() => console.log('MongoDB Conectado'))
  .catch(err => console.error('Erro de conexão:', err));

app.get('/', (req, res) => res.status(200).json({ status: 'API Online' }));

const usuariosRouter = require('./src/routes/usuariosRouter');
const reclamacoesRouter = require('./src/routes/reclamacoesRouter');


app.use('/usuarios', usuariosRouter);
app.use('/reclamacoes', reclamacoesRouter);


module.exports = app;
