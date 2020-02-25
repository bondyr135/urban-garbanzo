const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes/api");
const MONGODB_URI = require("./mongo_utils");

//MONGODB_URI ||
mongoose
  .connect(MONGODB_URI || "mongodb://localhost/calendar", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => {
    console.log(err);
  });

//httprequest

mongoose.connection.on("connected", () => {
  console.log("mongoose connection was connected");
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
