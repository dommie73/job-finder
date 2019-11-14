const { Router } = require("express");

const getJobOffers = require("../../scrapers");
const { JobOffer } = require("../../db/models");
// const testSaving = require("../../db/test");

const router = Router();

const logger = (req, res) => {
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
};

router.get("/scrape", async (req, res) => {
  logger(req, res);

  try {
    const data = await getJobOffers(req.query);

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

router.get("/search", async (req, res) => {
  logger(req, res);

  try {
    const data = await JobOffer.find({
      city: req.query.city,
      category: req.query.category
    });

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

module.exports = router;
