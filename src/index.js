const puppeteer = require('puppeteer');
const fs = require('fs');

const justJoinIT = require('./scrapers/just-join-it');
const noFluffJobs = require('./scrapers/no-fluff-jobs');

const FILENAME = 'job-offers.json';

const getAllData = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const justJoinITData = await justJoinIT(page);
    const noFluffJobsData = await noFluffJobs(page);
    const parsedOffersData = [...justJoinITData, ...noFluffJobsData];

    fs.writeFile(FILENAME,
      JSON.stringify(parsedOffersData, null, 2),
      error => error ?
        console.error(error) :
        console.info(`Successfully saved to ${FILENAME}`)
    );

    await browser.close();
  }

  catch (error) {
    console.error(error);
  }
}

getAllData();
