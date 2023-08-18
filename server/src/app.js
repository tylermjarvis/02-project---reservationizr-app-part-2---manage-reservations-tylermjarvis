const express = require("express");
const cors = require("cors");
// const { auth } = require("express-oauth2-jwt-bearer");
const app = express();

// const checkJwt = auth({
//   audience: "https://reservationizr.com",
//   issuerBaseURL: `https://dev-qf8fljxgwjjq7gei.au.auth0.com/`,
// });

app.use(cors());
app.use(express.json());

module.exports = app;
