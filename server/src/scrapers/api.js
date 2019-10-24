const puppeteer = require('puppeteer');

const justJoinIT = require('./just-join-it');
const noFluffJobs = require('./no-fluff-jobs');

const getJobOffers = async query => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const justJoinITData = await justJoinIT(page, query);
    const noFluffJobsData = await noFluffJobs(page, query);
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
