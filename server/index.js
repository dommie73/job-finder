const { PORT } = require("./src/config");

const app = require("./src/app");

require("./src/db");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
