const { userModel } = require('../data/User');
const mongoose = require('mongoose');

beforeAll((done) => {
 mongoose.connect('mongodb://localhost:27017/budgetDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 });
 done();
});

beforeEach((done) => {
 const newUser = new userModel({
    email: 'harsha@gmail.com',
    password: 'qwerty',
 });
 newUser.save((err) => {
    if (err) return console.log(err);
    console.log('New User Created');
    done();
 });
});

afterEach((done) => {
 userModel.deleteMany({}, (err) => {
    if (err) return console.log(err);
    console.log('Deleted all users');
    done();
 });
});

afterAll((done) => {
 mongoose.connection.close();
 done();
});

describe('User Test Suite', () => {
 it('finds user by email', async (done) => {
    const user = await userModel.findOne({ email: 'harsha@gmail.com' });
    expect(user).not.toBeNull();
    done();
 });
});