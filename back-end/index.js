const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/v1");
const PORT = process.env.PORT;
const ATLAS_MONGO_SERVER = process.env.ATLAS_MONGO_CONNECTION;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/v1", routes);

mongoose.connect(ATLAS_MONGO_SERVER).then(() => {
  console.log("Connected to the MongoDB");
  app.listen(PORT, () => {
    console.log("Server running at " + PORT);
  });
});
