// FIXME: Add a Mongoose model here
// All values are a string expect for "partySize" and "date"
// Should display date, restaurant name, party size and userId
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = Schema(
  [
    {
      partySize: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
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
      createdBy: {
        type: String,
        required: true,
      },
    },
  ],
  {
    toJSON: {
      transform(document, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model("Reservation", reservationSchema);
