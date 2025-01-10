const request = require('supertest');
const app = require('../server');

describe('Accounts API', () => {
    it('should fetch all accounts', async () => {
        const res = await request(app).get('/api/accounts');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});