// FIXME: Add a Mongoose model here
// All values are a string expect for "partySize"
// Should display date, restaurant name, party size
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = Schema([
  {
    partySize: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
  },
]);

module.exports = mongoose.model("Reservation", reservationSchema);
