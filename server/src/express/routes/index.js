const { Router } = require("express");

const getJobOffers = require("../../scrapers");
const testSaving = require("../../db/test");

const router = Router();

router.get("/scrape", async (req, res) => {
  const { method, path, query } = req;
  const { city, category } = query;

  console.log(
    `#### New request #### ${path}:
    type: ${method},
    query: {
      city: ${city},
      category: ${category}
    }`
  );

  try {
    const data = await getJobOffers(query);

    res
      .status(200)
      .type("application/json")
      .send(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .type("text/plain")
      .send("Oops, something went wrong :c");
  }
});

router.get("/search", testSaving);

module.exports = router;
