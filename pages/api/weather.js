import axios from 'axios'

export default function handler(req, res) {
  let queryString = req.query.q
  console.log('Weather being loaded for ' + queryString)
  let url =
    'http://api.weatherapi.com/v1/forecast.json?key=fbbd41244a6947eb83c182430231306&q=' +
    queryString
  axios
    .get(url)
    .then((weatherResponse) => {
      res.json(weatherResponse.data)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: err })
    })
}
