const port = process.env.PORT || 5001;
const app = require("./app");
const mongoose = require("mongoose");

const mongoDbUri = process.env.MONGO_URI || "mongodb://localhost:27017/mongo";

mongoose.connect(mongoDbUri);

// mongoose.connect("mongodb://localhost:27017/mongo");

app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});
