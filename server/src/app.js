const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
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

// Error messages
const invalidId = {
  message: "This id provided is not a valid id.",
};
const notFound = {
  message: "This id cannot be found in the database.",
};

// GET all restaurants in the database with the endpoint /restaurants
app.get("/restaurants", async (request, response) => {
  const restaurants = await RestaurantModel.find({});
  return response.status(200).send(restaurants);
});

// Will need to see if ObjectId is valid before fetching a single restaurant, when looking at the endpoint restaurants/:id
// GET a single restaurant with a param of restaurants/:id
app.get("/restaurants/:id", async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).send(invalidId);
  }

  const restaurant = await RestaurantModel.findById(id);

  if (!restaurant) {
    return response.status(404).send(notFound);
  }

  return response.status(200).send(restaurant);
});

// User would like to book a reservation.
// Create a reservation on the users profile in the database using POST and the endpoint /reservations/mock-user-id
// Only create a reservation if the user is logged in and has access to that profile
// Use Joi to stop the user from creating 0 or less in the partySize field
// Use Joi to make sure that the date is not a date that is in the past
// Use JWT token

// GET all reservations with /reservations/mock-user-id
// Needs authorization

// GET a single reservation with /reservations/mock-user-id/:id
// Needs authorization

module.exports = app;
