const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Fenny Limbadiya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Fenny Limbadiya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text!",
    name: "Fenny Limbadiya",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error:
        "You must provide an address in query parameter to see weather forecast.",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        latitude,
        longitude,
        location,
        address,
        forecastData:
          forecastData.weather_descriptions[0] +
          ". It is currently " +
          forecastData.temperature +
          " degrees out.",
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "404",
    name: "Fenny Limbadiya",
    errorMsg: "Help article not found",
  });
});

//matched anything accept above route
app.get("*", (req, res) => {
  res.render("notFound", {
    title: "404",
    name: "Fenny Limbadiya",
    errorMsg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up and running on port 3000");
});
