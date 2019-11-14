const getJobOffers = require("../scrapers");
const { compareAndSaveOffers } = require("../express/controllers");

const testSaving = async (req, res) => {
  try {
    const data = await getJobOffers({
      city: "wroclaw",
      category: "javascript"
    });
    compareAndSaveOffers(data);
    console.log("Database updated successfully");
    res.send("done");
  } catch (error) {
    console.log(error);
  }
};

module.exports = testSaving;
