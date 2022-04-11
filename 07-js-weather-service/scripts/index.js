import { ClientApp } from './ClientApp.js';

const citiesListBtn = document.getElementsByClassName('citiesListBtn')[0];
const weatherForecastBtn = document.getElementsByClassName('weatherForecastBtn')[0];
const resetBtn = document.getElementsByClassName('resetBtn')[0];

citiesListBtn.addEventListener('click', async () => {
  const clientApp = new ClientApp();

  console.log('Список доступных городов для прогноза:');
  console.log(await clientApp.requestCitiesList());
});

weatherForecastBtn.addEventListener('click', async () => {
  const clientApp = new ClientApp();

  const city = document.getElementsByClassName('city')[0].value;
  const day = document.getElementsByClassName('day')[0].value;

  await clientApp.getWeatherForecast(city, Number(day));
});

resetBtn.addEventListener('click', () => {
  document.getElementsByClassName('city')[0].value = '';
  document.getElementsByClassName('day')[0].value = '';
});
