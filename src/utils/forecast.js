const axios = require("axios");
const constants = require("../../constants/constants");

const forecast = (latitude, longitude, callback) => {
  let weatherUrl =
    constants.weatherUrl +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  axios
    .get(weatherUrl)
    .then(({ data }) => {
      const weatherData = data;

      if (weatherData.error) callback("Unable to find location", undefined);
      else callback(undefined, weatherData.current);
    })
    .catch((error) => callback("Unable to connect to service!", undefined));
};

module.exports = forecast;
