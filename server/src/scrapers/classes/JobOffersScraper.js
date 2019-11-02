const { getInnerText } = require('../utils');

class JobOffersScraper {
  constructor(websiteName, websiteUrl, page, selectors) {
    Object.assign(this, {
      websiteName,
      websiteUrl,
      page,
      selectors
    });
  }

  async goToOffersPage() {
    return await this.page.goto(this.websiteUrl, { waitUntil: 'networkidle0' });
  }

  async getItemValue(offer, selector) {
    return await offer.$eval(selector, getInnerText);
  }

  async getAddress(offer) {
    return await this.getItemValue(offer, this.selectors.address);
  }

  async getName(offer) {
    return await this.getItemValue(offer, this.selectors.name);
  }

  async getSalary(offer) {
    return await this.getItemValue(offer, this.selectors.salary);
  }

  async getTitle(offer) {
    return await this.getItemValue(offer, this.selectors.title);
  }

  async getUrl(offer) {
    return await this.getProperty(offer, 'href');
  }

  async getOffers() {
    return await this.page.$$(this.selectors.parent);
  }

  async getProperty(offer, property) {
    const propertyHandler = await offer.getProperty(property);
    return await propertyHandler.jsonValue();
  }

  async makeJobOffer(offer) {
    return {
      from: this.websiteName,
      title: await this.getTitle(offer),
      company: {
        name: await this.getName(offer),
        address: await this.getAddress(offer)
      },
      url: await this.getUrl(offer)
    };
  }

  async getJobOffers() {
    await this.goToOffersPage();

    const offers = await this.getOffers();
    const parsedOffers = offers.map(
      async offer => await this.makeJobOffer(offer)
    );

    return await Promise.all(parsedOffers);
  }
}

module.exports = JobOffersScraper;