const express = require("express");
const cors = require("cors");

const router = require("./express/routes");

const app = express();

app.use(cors());
app.use("/", router);

module.exports = app;
