const ClientApp = require('./ClientApp');

(async () => {
  const clientApp = new ClientApp();

  await clientApp.getWeatherForecast('Осло', 150).catch(console.error);

  console.log('Список доступных городов для прогноза:');

  clientApp.requestCitiesList()
  .then(console.log)
  .catch(console.error);
})();
