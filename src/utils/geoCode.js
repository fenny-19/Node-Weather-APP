const axios = require("axios");
const constants = require("../../constants/constants");

const geocode = (address, callback) => {
  let geoCodeUrl = constants.geoCodeUrl + encodeURIComponent(address);

  axios
    .get(geoCodeUrl)
    .then(({ data }) => {
      const geolocationData = data.data[0];
      callback(undefined, {
        latitude: geolocationData.latitude,
        longitude: geolocationData.longitude,
        location: geolocationData.label,
      });
    })
    .catch((error) => callback("Unable to connect to service!", undefined));
};

module.exports = geocode;
