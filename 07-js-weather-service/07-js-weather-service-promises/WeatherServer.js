const weatherBase = require('./utils/weatherBase');
const delay = require('./utils/delay');
const DAY_OF_YEAR = require('./utils/constants');

class WeatherServer {
  constructor() {
    this.weatherBase = weatherBase;
  }

  getCitiesList = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(Object.keys(this.weatherBase)), delay());
    });
  }

  getAverageTemperature = (city, dayOfYear) => {
    return new Promise((resolve, reject) => {
      if (!Object.keys(this.weatherBase).includes(city)) {
        reject('Неверно указан город!');
      }

      if (dayOfYear < DAY_OF_YEAR.FIRST || dayOfYear > DAY_OF_YEAR.LAST) {
        reject('Неверно указан день года!');
      }

      const latitude = this.weatherBase[city].latitude;
      // формула вычисления средней температуры
      const temperature = 30 + latitude * (Math.abs(182 - Math.abs(202 - dayOfYear)) / 210 - 1);

      setTimeout(() => resolve(temperature.toFixed(1)), delay());
    });
  }

}

module.exports = WeatherServer;
