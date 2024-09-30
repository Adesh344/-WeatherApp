const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    const location = req.body.cityName;
    // Weather API link
    const url = 'Add Your Key Here';

    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);

            // Fetching all the Data From the API
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const humid = weatherData.main.humidity;
            const visibility = weatherData.visibility;
            const seaLevel = weatherData.main.sea_level;

            // Sending Data to the website with inline CSS
            res.write('<html>');
            res.write('<head>');
            res.write('<style>');
            res.write('body { background-color: #092756; color: #fff; font-family: "Open Sans", sans-serif; }');
            res.write('h1 { color: #fff; text-shadow: 0 0 10px rgba(0, 0, 0, 0.3); text-align: center; }');
            res.write('h2 { color: #fff; }');
            res.write('</style>');
            res.write('</head>');
            res.write('<body>');
            res.write(`<h1>Temperature of ${location} is ${temp} &#8451;</h1>`);
            res.write(`<h2>The Weather description: ${description}</h2>`);
            res.write(`<h2>Humidity: ${humid}</h2>`);
            res.write(`<h2>Visibility: ${visibility}</h2>`);
            res.write(`<h2>Sea Level Height: ${seaLevel}</h2>`);
            res.write('</body>');
            res.write('</html>');
            res.end();
        });
    });
});

app.listen(3000);
