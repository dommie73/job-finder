const { Router } = require("express");

const router = Router();

router.get("/search", (req, res) => {
  const { query } = req;
  const { city, category } = query;

  res.send(`here I will query a database with params: 
  city: ${city},
  category: ${category}`);
});

module.exports = router;
