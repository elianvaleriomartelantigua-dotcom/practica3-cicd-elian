const request = require('supertest');
const { createApp } = require('../src/app');
const { validarTitulo } = require('../src/validarTitulo');

describe('Validación unitaria del título', () => {
  test.each([undefined, null, 123, '', '   '])('rechaza título vacío o inválido: %p', valor => {
    expect(validarTitulo(valor)).toBe('El título es obligatorio');
  });
  test('acepta 120 caracteres', () => expect(validarTitulo('a'.repeat(120))).toBeNull());
  test('rechaza 121 caracteres', () => expect(validarTitulo('a'.repeat(121))).not.toBeNull());
});

describe('Integración: eliminar y validar tareas', () => {
  let app;
  beforeEach(() => { app = createApp(); });
  test('elimina una tarea y desaparece de la lista', async () => {
    const creada = await request(app).post('/api/tareas').send({ titulo: 'Borrar' });
    const r = await request(app).delete(`/api/tareas/${creada.body.id}`);
    expect(r.status).toBe(204);
    expect(r.text).toBe('');
    const lista = await request(app).get('/api/tareas');
    expect(lista.body).toEqual([]);
  });
  test('eliminar una tarea inexistente responde 404', async () => {
    expect((await request(app).delete('/api/tareas/999')).status).toBe(404);
  });
  test('IDs no se repiten después de borrar', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'Primera' });
    await request(app).post('/api/tareas').send({ titulo: 'Segunda' });
    await request(app).delete('/api/tareas/1');
    const tercera = await request(app).post('/api/tareas').send({ titulo: 'Tercera' });
    expect(tercera.body.id).toBe(3);
    expect((await request(app).get('/api/tareas')).body.map(t => t.id)).toEqual([2, 3]);
  });
  test('POST rechaza título demasiado largo sin crear tarea', async () => {
    expect((await request(app).post('/api/tareas').send({ titulo: 'x'.repeat(121) })).status).toBe(400);
    expect((await request(app).get('/api/tareas')).body).toEqual([]);
  });
  test('POST acepta título de longitud máxima y recorta espacios', async () => {
    const r = await request(app).post('/api/tareas').send({ titulo: '  ' + 'a'.repeat(120) + '  ' });
    expect(r.status).toBe(201);
    expect(r.body.titulo).toHaveLength(120);
  });
  test('PATCH alterna de completada a pendiente', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'Alternar' });
    await request(app).patch('/api/tareas/1');
    expect((await request(app).patch('/api/tareas/1')).body.completada).toBe(false);
  });
  test('frontend se sirve desde Express', async () => {
    const r = await request(app).get('/');
    expect(r.status).toBe(200);
    expect(r.text).toContain('Lista de tareas');
  });
});
