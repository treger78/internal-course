const Calculator = require('../calculator');

// tests for 'sum' method:

test.each([
  [1, 2, 3],
  [0.1, 1.1, 2],
  [-1, -2, -3],
  [-1.2, -2.2, -3],
  [1,, NaN],
  [null, 'abc', NaN],
])('test sum with false parameter', (a, b, expected) => {
  const calculator = new Calculator(false);
  expect(calculator.sum(a, b)).toBe(expected);
});

test.each([
  [2, 2, 4],
  [7.2, 3.9, 11],
  [-4, -6, -10],
  [-3.4, -1.2, -5],
])('test sum with true parameter', (a, b, expected) => {
  const calculator = new Calculator(true);
  expect(calculator.sum(a, b)).toBe(expected);
});

// tests for 'showResult' & 'sumAndShowResult' methods:

let calculator = null;

beforeEach(() => {
  calculator = new Calculator(false);
  console.log = jest.fn();
});

test.each([
  [1, 1],
  [0.5, 0.5],
  [-3, -3],
  [-0.1, -0.1],
  ['result', 'result'],
  [,,],
])('test showResult', (result, expected) => {
  calculator.showResult(result);
  expect(console.log.mock.calls[0][0]).toBe(expected);
});

test.each([
  [1, 2, 3],
  [0.1, 1.1, 2],
  [-1, -2, -3],
  [-1.2, -2.2, -3],
  [1,, NaN],
  [null, 'abc', NaN],
])('test sumAndShowResult', (a, b, expected) => {
  calculator.sumAndShowResult(a, b);
  expect(console.log.mock.calls[0][0]).toBe(expected);
});
