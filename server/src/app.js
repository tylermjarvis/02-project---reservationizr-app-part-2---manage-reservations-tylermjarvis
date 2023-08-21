const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const RestaurantModel = require("./models/RestaurantModel");
// const ReservationModel = require("./models/ReservationModel");
// const { auth } = require("express-oauth2-jwt-bearer");
const app = express();

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
// const checkJwt = auth({
//   audience: "https://reservationizr.com",
//   issuerBaseURL: `https://dev-qf8fljxgwjjq7gei.au.auth0.com/`,
// });

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (request, response) => {
  const restaurants = await RestaurantModel.find({});
  return response.status(200).send(restaurants);
});

module.exports = app;
