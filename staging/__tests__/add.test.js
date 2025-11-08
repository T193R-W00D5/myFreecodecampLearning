import { add } from '../src/script.js';

test('add returns the sum of two numbers', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});