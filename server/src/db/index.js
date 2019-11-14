const mongoose = require("mongoose");

const {
  MONGODB_URI,
  MONGODB_NAME,
  MONGODB_USER,
  MONGODB_PASS
} = require("../config");

mongoose.connect(MONGODB_URI, {
  dbName: MONGODB_NAME,
  user: MONGODB_USER,
  pass: MONGODB_PASS,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log(`Database ${MONGODB_NAME} is connected`);
});
