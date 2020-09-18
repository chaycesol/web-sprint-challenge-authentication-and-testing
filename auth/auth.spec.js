const supertest = require('supertest')

const server = require('../api/server');
const db = require('../database/dbConfig');

describe("server", () => {
    describe("environment", () => {
        it('should set the DB_ENV variable to "testing"', () => {
            expect(process.env.DB_ENV).toBe("testing");
        });
    });
});