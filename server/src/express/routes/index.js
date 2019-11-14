const { Router } = require("express");

const getJobOffers = require("../../scrapers");

const router = Router();

router.get("/search", async (req, res) => {
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

module.exports = router;
