const port = process.env.PORT || 5001;
const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost27017/mongo");

app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});
