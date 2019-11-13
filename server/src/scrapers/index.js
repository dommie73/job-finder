const puppeteer = require("puppeteer");

const JustJoinIT = require("./classes/JustJoinIT");
const NoFluffJobs = require("./classes/NoFluffJobs");
const JobsForGeek = require("./classes/JobsForGeek");

const getJobOffers = async query => {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    const justJoinIT = await new JustJoinIT(page).getJobOffers(query);
    const noFluffJobs = await new NoFluffJobs(page).getJobOffers(query);
    const jobsForGeek = await new JobsForGeek(page).getJobOffers(query);

    const data = [...justJoinIT, ...noFluffJobs, ...jobsForGeek];
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  } finally {
    await browser.close();
  }
};

module.exports = getJobOffers;
