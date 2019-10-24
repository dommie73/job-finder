const WEBSITE_URL = 'https://justjoin.it';
const WEBSITE_NAME = 'Just Join IT';

const justJoinIT = async (page, { city = 'all', category = '' }) => {
  await page.goto(`${WEBSITE_URL}/${city}/${category}`, { waitUntil: 'networkidle0' });

  const rawOffersData = await page.$$('offer-item > .item');

  const parsedOffersData = rawOffersData.map(async offer => {
    const urlHandler = await offer.getProperty('href');

    const url = await urlHandler.jsonValue();

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
          .filter(node => node.nodeType === Node.TEXT_NODE)
          .map(node => node.nodeValue)
          .join('')
          .trim()
      )
    );

    return {
      from: WEBSITE_NAME,
      title,
      salary,
      company: {
        name,
        address
      },
      url
    };
  });

  return await Promise.all(parsedOffersData);
}

module.exports = justJoinIT;
