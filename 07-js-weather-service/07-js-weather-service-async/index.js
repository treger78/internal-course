const ClientApp = require('./ClientApp');

(async () => {
  const clientApp = new ClientApp();

  await clientApp.getWeatherForecast('Осло', 150);

  console.log('Список доступных городов для прогноза:');

  console.log(await clientApp.requestCitiesList());
})();
