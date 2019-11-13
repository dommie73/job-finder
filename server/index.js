const { PORT } = require("./src/config");

const app = require("./src/app");
const router = require("./src/express/routes");

require("./src/db");

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
