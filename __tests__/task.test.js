import request from 'supertest';
import app from '../src/app.js';
import server from '../src/server.js'; // Asegúrate de ajustar la ruta según sea necesario

beforeAll(done => {
  server.listen(process.env.PORT || 4000, () => {
    console.log(`Test server running on port ${process.env.PORT || 4000}`);
    done();
  });
});

afterAll(done => {
  server.close(done);
});

describe('Tasks API', () => {
  let taskId;

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    taskId = response.body.id;
  });

  it('should fetch all tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should fetch a single task', async () => {
    const response = await request(app).get(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', taskId);
  });

  it('should update a task', async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        title: 'Updated Task',
        description: 'Updated Description',
        status: 'completed'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Task');
  });

  it('should delete a task', async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(200);
  });

  it('should return 404 when fetching a deleted task', async () => {
    const response = await request(app).get(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(404);
  });
});
