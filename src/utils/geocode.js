const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmxhZGJpY3UiLCJhIjoiY2p3Z2hlNTljMHZ6ajQzcXpxODB5cnE5eSJ9.vbWg5MZe0LEFf4f4Dy7ghg&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location");
    } else {
      const { features } = response.body;
      const latitude = features[0].center[1];
      const longitude = features[0].center[0];
      callback(null, { latitude, longitude, location: features[0].place_name });
    }
  });
};

module.exports = geocode;
