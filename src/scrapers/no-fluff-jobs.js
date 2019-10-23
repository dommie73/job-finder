const WEBSITE_URL = 'https://nofluffjobs.com/jobs';
const WEBSITE_NAME = 'No Fluff Jobs';

const noFluffJobs = async (page, { city = '', category = '' }) => {
  await page.goto(`${WEBSITE_URL}/${city}/${category}`, { waitUntil: 'networkidle0' });

  const offersURLs = await page.$$eval(
    '.list-item .posting-list-item',
    (nodes, city) => nodes
      .map(node => node.href)
      .filter(node => node.match(city)),
    city
  );

  const parsedOffersData = [];

  for (const url of offersURLs) {
    await page.goto(url, { waitUntil: 'networkidle0' });

    const cookieBtn = await page.$('.btn-accept-cookie');
    if (cookieBtn) {
      await cookieBtn.click();
      await page.waitForFunction(() => !document.querySelector('bs-modal-backdrop'));
    }

    const title = await page.$eval(
      '.posting-details-description h1',
      node => node.innerText.trim()
    );

    const salary = await page.$$eval(
      '.posting-main-info.double-salary',
      nodes => nodes.map(node =>
        node.innerText.replace(/(\n)+/g, ' ')
          .trim()).join(', ')
    );

    const name = await page.$eval(
      '.posting-details-description h1 + a.inline-info > dl > dd',
      node => node.innerText
    );

    const mainAddress = await page.$eval(
      'nfj-postings-locations .text-truncate',
      node => node.innerText
    );

    let otherAdresses = '';

    const dropdown = await page.$('nfj-postings-locations .dropdown-icon');

    if (dropdown) {
      await dropdown.click();
      await page.waitForSelector('popover-container .d-block');
      otherAdresses = await page.$$eval(
        'popover-container .d-block',
        nodes => '; ' + nodes.map(node => node.innerText).join('; ')
      );
    }

    const address = mainAddress + otherAdresses;

    parsedOffersData.push({
      from: WEBSITE_NAME,
      title,
      salary,
      company: {
        name,
        address
      },
      url
    });
  }

  return parsedOffersData;
}

module.exports = noFluffJobs;
