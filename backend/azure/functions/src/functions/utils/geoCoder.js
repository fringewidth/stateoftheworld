const API_KEY = process.env.OWM_API_KEY;

async function geoCoder(city) {
  return await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return { lat: data[0].lat, lon: data[0].lon };
    });
}

module.exports = geoCoder;
