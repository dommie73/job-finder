const puppeteer = require('puppeteer');

const JustJoinIT = require('./classes/JustJoinIT');
const NoFluffJobs = require('./classes/NoFluffJobs');

const getJobOffers = async query => {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    const justJoinIT = await new JustJoinIT(page).getJobOffers(query);
    const noFluffJobs = await new NoFluffJobs(page).getJobOffers(query);

    const data = [...justJoinIT, ...noFluffJobs];
    console.log(data);
    return data;

  }

  catch (error) {
    console.error(error.message);
    throw error;
  }

  finally {
    await browser.close();
  }
};

getJobOffers({ city: 'all', category: 'javascript' });