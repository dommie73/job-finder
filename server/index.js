const { PORT } = require("./src/config");

const app = require("./src/app");
const { scrapeOffers } = require("./src/express/controllers");

require("./src/db");

app.on("ready", () => {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    setInterval(async () => await scrapeOffers(), 21600000);
  });
});
