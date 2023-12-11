import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

const { eye } = require('@applitools/eyes-cypress');
const request = require('supertest');


describe('Budget Test Suite', () => {
    it('returns a list of budgets', eye.it('Checking budget list', async () => {
       const response = await request(App).get('/budgets');
       expect(response.statusCode).toBe(200);
       expect(response.body.length).toBeGreaterThan(0);
    }));
   });

   beforeEach(async () => {
    await eye.open('My Application', 'Budget Test', {
       width: 1024,
       height: 768,
    });
   });

   // Check the budget list page
await eye.check('Budget List');

afterEach(async () => {
    await eye.close();
   });

