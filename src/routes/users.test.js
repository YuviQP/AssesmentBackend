const req = require('supertest');
const { app } = require('../app');
const { connect, disconnect, cleanup } = require('../database');
const { createUser } = require('../utils/testHelper');

describe('user', () => {
beforeAll(async () => {
    await connect();
});

beforeEach(async () => {
    await cleanup();
});

afterAll(async () => {
    await disconnect();
});
it('should register user correctly', async () => {
    const user = { email: 'yuvisa.palomino@gmail.com', password: '12345' };
    const res = await req(app)
    .post('/auth/local/register')
    .send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
});

it('should login user correctly', async () => {
    const user = { email: 'yuvisa.palomino@gmail.com', password: '12345' };
    await createUser(user);
    const res = await req(app)
    .post('/auth/local/login')
    .send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
});
})