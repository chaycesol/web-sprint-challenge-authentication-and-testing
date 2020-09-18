const supertest = require('supertest');

const server = require('../api/server');
const db = require('../database/dbConfig');


describe("server", () => {
    describe("environment", () => {
        it('should set the DB_ENV variable to "testing"', () => {
            expect(process.env.DB_ENV).toBe("testing");
        });
    });
    describe("GET /", () => {
        it("should return HTTP status code 200", async () => {
            return await supertest(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
    });
});

describe('endpoints', () => {
    describe('test server enpoints for register and login', () => {
        beforeEach(async () => {
          await db('users').truncate();
          await supertest(server).post('/api/auth/register').send({
            username: 'test_jest1',
            password: 'password',
          });
        });
        describe('POST /register', () => {
          it('should post user to /register', async () => {
            await supertest(server).post('/api/auth/register').send({
              username: 'test_jest2',
              password: 'password',
            });
      
            const users = await db('users');
            expect(users).toHaveLength(2);
          });
      
          it('should return a 201 OK upon POST /register', async () => {
            const res = await supertest(server)
              .post('/api/auth/register')
              .send({
                username: 'test_jest3',
                password: 'password',
              });
      
            expect(res.status).toBe(201);
          });
          it('should return a 500 if missing information', async () => {
            const res = await supertest(server)
              .post('/api/auth/register')
              .send({
                username: 'test_jest3',
              });
      
            expect(res.status).toBe(500);
          });
        });
      
        describe('POST /login', () => {
          it('should return a 200 OK on POST /login', async () => {
            const res = await supertest(server).post('/api/auth/login').send({
              username: 'test_jest1',
              password: 'password',
            });
      
            expect(res.status).toBe(200);
          });
      
          it('should not return a 404 on POST /login with correct creds', async () => {
            const res = await supertest(server).post('/api/auth/login').send({
              username: 'test_jest1',
              password: 'password',
            });
      
            expect(res.status).not.toBe(404);
          });
      
          it('should  return a 404 on POST /login with wrong creds', async () => {
            const res = await supertest(server).post('/api/auth/login').send({
              username: 'test_jest1',
              password: 'secretpasswor',
            });
      
            expect(res.status).not.toBe(404);
          });

          it("should respond with welcome message in json", async () => {
            return await supertest(server)
              .post("/api/auth/login")
              .send({
                username: 'test_jest1',
                password: 'password',
              })
              .then((res) =>{
                expect(res.body.message).toMatch(/welcome to dad jokes, test_jest1!/i);
              })
          });
        });
    });      
});
