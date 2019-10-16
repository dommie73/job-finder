const puppeteer = require('puppeteer');

const justJoinIT = require('./scrapers/just-join-it');
const noFluffJobs = require('./scrapers/no-fluff-jobs');

const getJobOffers = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const justJoinITData = await justJoinIT(page);
    const noFluffJobsData = await noFluffJobs(page);
    const parsedOffersData = [...justJoinITData, ...noFluffJobsData];

    await browser.close();
    return parsedOffersData;
  }

  catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getJobOffers
};
