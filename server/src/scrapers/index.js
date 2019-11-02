const puppeteer = require('puppeteer');

const JustJoinIT = require('./classes/JustJoinIT');

const getJobOffers = async query => {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    const justJoinIT = new JustJoinIT(page, query);
    const justJoinITData = await justJoinIT.getJobOffers();

    console.log(justJoinITData);
    return justJoinITData;
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