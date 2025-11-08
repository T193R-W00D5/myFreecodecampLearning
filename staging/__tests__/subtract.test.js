import { subtract } from '../src/script.js';

test('subtract returns the difference of two numbers', () => {
  expect(subtract(5, 3)).toBe(2);
  expect(subtract(0, 1)).toBe(-1);
});