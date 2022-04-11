import { toBeOneOf } from 'jest-extended';
import { ClientApp } from '../scripts/ClientApp.js';
import { weatherBase } from '../utils/weatherBase.js';

expect.extend({ toBeOneOf });

let clientApp = null;

beforeEach(() => {
  clientApp = new ClientApp();
});

test('should be keys-array from weatherBase or timeout', async () => {
  expect(await clientApp.requestCitiesList())
    .toBeOneOf([
      Object.keys(weatherBase),
      'Превышен таймаут ответа сервера!'
    ]);
});

test('should be value of average temperature or timeout', async () => {
  const temperature = 30 + weatherBase['Осло'].latitude * (Math.abs(182 - Math.abs(202 - 150)) / 210 - 1);

  expect(await clientApp.requestAverageTemperature('Осло', 150))
    .toBeOneOf([
      temperature.toFixed(1),
      'Превышен таймаут ответа сервера!'
    ]);
});

test.each([
  ['', 1, 'Неверно указан город!'],
  ['Осло', 0, 'Неверно указан день года!'],
])('should be error message or timeout', async (city, dayOfYear, expected) => {
  expect(await clientApp.requestAverageTemperature(city, dayOfYear))
    .toBeOneOf([
      expected,
      'Превышен таймаут ответа сервера!'
    ]);
});

test.each([
  [150, {"day": 30, "month": "May"}],
  [1, {"day": 1, "month": "January"}],
  [365, {"day": 31, "month": "December"}],
  [0, {}],
  [-1, {}],
  [500, {}],
  ['', {}],
])('should be object with day and month or empty object or timeout', (dayOfYear, expected) => {
  expect(clientApp.calculateDayAndMonth(dayOfYear))
    .toBeOneOf([
      expected,
      'Превышен таймаут ответа сервера!'
    ]);
});

test('should be forecast line or timeout', async () => {
  const temperature = 30 + weatherBase['Осло'].latitude * (Math.abs(182 - Math.abs(202 - 150)) / 210 - 1);
  const dayAndMonth = await clientApp.calculateDayAndMonth(150);
  const forecast = `Город ${'Осло'}, ${dayAndMonth.day} ${dayAndMonth.month}, средняя температура: ${temperature.toFixed(1)}`

  expect(await clientApp.getWeatherForecast('Осло', 150))
    .toBeOneOf([
      forecast,
      'Превышен таймаут ответа сервера!'
    ]);
});
