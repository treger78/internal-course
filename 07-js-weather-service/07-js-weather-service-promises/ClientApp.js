const WeatherServer = require('./WeatherServer');
const DAY_OF_YEAR = require('./utils/constants');

class ClientApp {
  constructor() {
    this.weatherServer = new WeatherServer();
    this.serverTimeout = 1501;

    this.responseTimeout = () => {
      return new Promise((reject) => {
        setTimeout(() => reject('Превышен таймаут ответа сервера!'), this.serverTimeout);
      });
    }
  }

  requestCitiesList = () => {
    if (!this.weatherServer) {
      return new Promise((reject) => {
        reject('Отсутствует подключение к серверу!');
      });
    }

    return Promise.race([
      this.responseTimeout(),
      this.weatherServer.getCitiesList(),
    ]);
  }

  requestAverageTemperature = (city, dayOfYear) => {
    if (!this.weatherServer) {
      return new Promise((resolve, reject) => {
        reject('Отсутствует подключение к серверу!');
      });
    }

    return Promise.race([
      this.responseTimeout(),
      this.weatherServer.getAverageTemperature(city, dayOfYear),
    ]);
  }

  calculateDayAndMonth = (dayOfYear) => {

    if (dayOfYear < 0 || dayOfYear > DAY_OF_YEAR.LAST || typeof dayOfYear !== 'number') {
      return {};
    }

    const monthsObj = {
      'January': 31,
      'February': 28,
      'March': 31,
      'April': 30,
      'May': 31,
      'June': 30,
      'July': 31,
      'August': 31,
      'September': 30,
      'October': 31,
      'November': 30,
      'December': 31
    }

    const days = Object.values(monthsObj);
    const months = Object.keys(monthsObj);

    let i = 0;
    let month;
    let day = dayOfYear;

    while (day > 0) {
      month = days[i];

      if (day - month > 0) {
        day -= month;
        i += 1;
      } else {
        break;
      }
    }

    return {
      day,
      month: months[i]
    };
  }

  getWeatherForecast(city, dayOfYear) {
    return new Promise((resolve) => {
      const dayAndMonth = this.calculateDayAndMonth(dayOfYear);

      console.log(`Город ${city}, ${dayAndMonth.day} ${dayAndMonth.month}, средняя температура: `);

      resolve(this.requestAverageTemperature(city, dayOfYear).then(console.log));
    });
  }
}

module.exports = ClientApp;
