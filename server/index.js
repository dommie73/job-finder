const app = require("./src/app");
const { PORT } = require("./src/config");

require("./src/db");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
