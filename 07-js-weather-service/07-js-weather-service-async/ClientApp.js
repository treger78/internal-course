const WeatherServer = require('./WeatherServer');
const DAY_OF_YEAR = require('./utils/constants');

class ClientApp {
  constructor() {
    this.weatherServer = new WeatherServer();
    this.serverTimeout = 1501;

    this.responseTimeout = async () => {
      return new Promise((reject) => {
        setTimeout(() => reject('Превышен таймаут ответа сервера!'), this.serverTimeout);
      });
    }
  }

  requestCitiesList = async () => {
    try {
      if (!this.weatherServer) {
        throw new Error('Отсутствует подключение к серверу!');
      }

      return Promise.race([
        this.responseTimeout(),
        this.weatherServer.getCitiesList(),
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  requestAverageTemperature = async (city, dayOfYear) => {
    try {
      if (!this.weatherServer) {
        throw new Error('Отсутствует подключение к серверу!');
      }

      return Promise.race([
        this.responseTimeout(),
        this.weatherServer.getAverageTemperature(city, dayOfYear),
      ]);
    } catch (error) {
      console.error(error);
    }
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

  getWeatherForecast = async (city, dayOfYear) => {
    try {
      const dayAndMonth = this.calculateDayAndMonth(dayOfYear);
      const averageTemperature = await this.requestAverageTemperature(city, dayOfYear);

      const forecast = `Город ${city}, ${dayAndMonth.day} ${dayAndMonth.month}, средняя температура: ${averageTemperature}`;

      console.log(forecast);

      return forecast;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = ClientApp;
