const puppeteer = require('puppeteer');
const fs = require('fs');

const WEBSITE_URL = 'https://justjoin.it/wroclaw/javascript';
const FILENAME = 'job-offers.json';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(WEBSITE_URL);

    const rawOffersData = await page.$$('offer-item > .item');
    const offersData = rawOffersData.map(async offer => {
      const title = await offer.$eval(
        '.item-row > .primary-line > .title',
        node => node.innerText);
      const salary = await offer.$eval(
        '.item-row > .primary-line .salary',
        node => node.innerText);
      const [name, address] = await offer.$$eval(
        '.item-row > .secondary-line > .company-info span',
        nodes => nodes.map(node =>
          [...node.childNodes]
            .filter(node => node.nodeType === 3)
            .map(node => node.nodeValue)
            .join('')
            .trim()
        )
      );

      return {
        title,
        salary,
        company: {
          name,
          address
        }
      }
    });

    const parsedOffersData = await Promise.all(offersData);

    fs.writeFile(FILENAME,
      JSON.stringify(parsedOffersData),
      error => error ?
        console.error(error) :
        console.info(`Successfully saved to ${FILENAME}`)
    );

    await browser.close();
  }

  catch (error) {
    console.error(error);
  }
})();