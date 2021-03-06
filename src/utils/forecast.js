const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/41a78956eca5fbdf0cf169e82bec1685/${latitude},${longitude}?units=si`;
  request({ url, json: true }, (error, response) => {
    const { body } = response;
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback(body.error);
    } else {
      const { data } = body.daily;
      const { temperature, precipProbability, precipType } = body.currently;
      console.log(body.currently);
      const message = `${
        data[0].summary
      } It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of ${precipType ||
        "rain"}.
      The high for the day is ${data[0].temperatureHigh} with a low of ${
        data[0].temperatureLow
      }.`;
      callback(undefined, message);
    }
  });
};

module.exports = forecast;
