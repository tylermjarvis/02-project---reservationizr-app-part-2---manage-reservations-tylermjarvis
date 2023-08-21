// FIXME: Add a Mongoose model here
// All values are a string
// Should display name, description and picture for each restaurant
const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantModel = Schema(
  [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
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

module.exports = mongoose.model("Restaurant", restaurantModel);
