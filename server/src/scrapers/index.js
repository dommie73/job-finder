const puppeteer = require('puppeteer');

const JustJoinIT = require('./classes/JustJoinIT');
const NoFluffJobs = require('./classes/NoFluffJobs');

const getJobOffers = async query => {
  const browser = await puppeteer.launch({ headless: false });

  try {
    const page = await browser.newPage();

    // const justJoinIT = new JustJoinIT(page, query);
    // const justJoinITData = await justJoinIT.getJobOffers();

    const noFluffJobs = new NoFluffJobs(page, query);
    const noFluffJobsData = await noFluffJobs.getJobOffers();

    // console.log(justJoinITData);
    // return justJoinITData;

    console.log(noFluffJobsData);
    return noFluffJobsData;
  }

  catch (error) {
    console.error(error.message);
    throw error;
  }

  finally {
    await browser.close();
  }
};

getJobOffers({ city: 'wroclaw', category: 'javascript' });