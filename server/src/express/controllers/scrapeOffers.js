const cities = require("../../scrapers/queries/cities");
const categories = require("../../scrapers/queries/categories");

const getJobOffers = require("../../scrapers");
const saveOffers = require("./saveOffers");

const scrapeOffers = async () => {
  console.log("Starting to scrape all offers...");
  for (const city of cities) {
    for (const category of categories) {
      try {
        console.log(`Scraping data: ${city}, ${category}`);
        const data = await getJobOffers({ city, category });
        await saveOffers(data);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  console.log(`Scraping offers has ended.`);
};

module.exports = scrapeOffers;
