const req=require('supertest');
const { app }=require('../app');

describe('app',()=>{
it('should receive a welcome message',async()=>
{
    const res=await req(app).get('/')

    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Bienvenidos a FAVS API/);
})
})