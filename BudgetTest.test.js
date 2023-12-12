const request = require('supertest');
const app = require('../app');
const { budgetModel } = require('../data/Budget');
const mongoose = require('mongoose');

beforeAll((done) => {
 mongoose.connect('mongodb+srv://suryavamsi:surya1459@finalproject.zqnxrkg.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 });
 done();
});

beforeEach((done) => {
 const newBudget = new budgetModel({
    category: 'Groceries',
    amount: 200,
 });
 newBudget.save((err) => {
    if (err) return console.log(err);
    console.log('New Budget Created');
    done();
 });
});

afterEach((done) => {
 budgetModel.deleteMany({}, (err) => {
    if (err) return console.log(err);
    console.log('Deleted all budgets');
    done();
 });
});

afterAll((done) => {
 mongoose.connection.close();
 done();
});

describe('Budget Test Suite', () => {
 it('returns a list of budgets', async (done) => {
    const response = await request(app).get('/budgets');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    done();
 });
});