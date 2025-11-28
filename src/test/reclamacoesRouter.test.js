const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const usuarios = require('../models/usuariosModel');
const reclamacoes = require('../models/reclamacoesModel');

const request = supertest(app);

let token;
let userId;
let reclamacaoId;

const usuarioTeste = { email: 'teste@crud.com', senha: '123' };
const reclamacaoTeste = { titulo: 'Produto Quebrado', descricao: 'Veio com defeito', empresa: 'Loja X' };

beforeAll(async () => {
  await usuarios.deleteMany({});
  await reclamacoes.deleteMany({});

  await request.post('/usuarios').send(usuarioTeste);
  
  const resLogin = await request.post('/usuarios/login').send({ usuario: usuarioTeste.email, senha: usuarioTeste.senha });
  token = resLogin.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /reclamacoes', () => {
  it('deve criar uma reclamação e retornar 201', async () => {
    const response = await request
      .post('/reclamacoes')
      .set('authorization', `Bearer ${token}`)
      .send(reclamacaoTeste);
    
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.titulo).toBe('Produto Quebrado');
    
    reclamacaoId = response.body._id;
  });

  it('deve retornar 401 sem token', async () => {
    const response = await request.post('/reclamacoes').send(reclamacaoTeste);
    expect(response.status).toBe(401);
  });

  it('deve retornar 422 com dados incompletos', async () => {
    const response = await request
      .post('/reclamacoes')
      .set('authorization', `Bearer ${token}`)
      .send({ titulo: 'Só titulo' });
    expect(response.status).toBe(422);
  });
});

describe('GET /reclamacoes', () => {
  it('deve listar reclamações e retornar 200', async () => {
    const response = await request.get('/reclamacoes');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('GET /reclamacoes/:id', () => {
  it('deve retornar reclamação por ID e retornar 200', async () => {
    const response = await request.get(`/reclamacoes/${reclamacaoId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(reclamacaoId);
  });

  it('deve retornar 404 para ID inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request.get(`/reclamacoes/${fakeId}`);
    expect(response.status).toBe(404);
  });
});

describe('PUT /reclamacoes/:id', () => {
  it('deve atualizar a reclamação completa e retornar 200', async () => {
    const novosDados = { 
        titulo: 'Produto Quebrado (Editado)', 
        descricao: 'Resolvido', 
        empresa: 'Loja X', 
        status: 'Em análise' 
    };
    
    const response = await request
      .put(`/reclamacoes/${reclamacaoId}`)
      .set('authorization', `Bearer ${token}`)
      .send(novosDados);

    expect(response.status).toBe(200);
    expect(response.body.titulo).toBe('Produto Quebrado (Editado)');
  });
});

describe('PATCH /reclamacoes/:id', () => {
  it('deve atualizar parcialmente (status) e retornar 200', async () => {
    const response = await request
      .patch(`/reclamacoes/${reclamacaoId}`)
      .set('authorization', `Bearer ${token}`)
      .send({ status: 'Resolvida' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Resolvida');
    expect(response.body.titulo).toBe('Produto Quebrado (Editado)');
  });
});

describe('DELETE /reclamacoes/:id', () => {
  it('deve deletar a reclamação e retornar 204', async () => {
    const response = await request
      .delete(`/reclamacoes/${reclamacaoId}`)
      .set('authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(204);
  });

  it('deve retornar 404 ao tentar deletar novamente', async () => {
    const response = await request
      .delete(`/reclamacoes/${reclamacaoId}`)
      .set('authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(404);
  });
});