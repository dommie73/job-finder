const { getInnerText } = require('../utils');

const defaultQueries = require('../queries/default');

class JobOffersScraper {
  constructor(websiteName, websiteUrl, page, selectors, queries, goToEach) {
    Object.assign(this, {
      websiteName,
      websiteUrl,
      page,
      selectors,
      goToEach
    });

    this.queries = { ...defaultQueries, ...queries };
  }

  parseUrl({ city, category }) {
    return [
      this.websiteUrl,
      this.queries.cities[city],
      this.queries.categories[category]
    ]
      .join('/')
      .replace(/(\/all)*$/, '');
  }

  async _goToOffersPage(url = this.websiteUrl) {
    return await this.page.goto(url, { waitUntil: 'networkidle0' });
  }

  async _getItemValue(offer, selector) {
    return await offer.$eval(selector, getInnerText);
  }

  async getAddress(offer) {
    return await this._getItemValue(offer, this.selectors.address);
  }

  async getName(offer) {
    return await this._getItemValue(offer, this.selectors.name);
  }

  async getSalary(offer) {
    return await this._getItemValue(offer, this.selectors.salary);
  }

  async getTitle(offer) {
    return await this._getItemValue(offer, this.selectors.title);
  }

  async getUrl(offer) {
    return await this._getProperty(offer, 'href');
  }

  async _getOffersParentNodes() {
    return await this.page.$$(this.selectors.parent);
  }

  async _getProperty(offer, property) {
    const propertyHandler = await offer.getProperty(property);
    return await propertyHandler.jsonValue();
  }

  async makeJobOffer(offer) {
    const url = this.goToEach ?
      await this.page.url() :
      await this.getUrl(offer);

    return {
      from: this.websiteName,
      title: await this.getTitle(offer),
      salary: await this.getSalary(offer),
      company: {
        name: await this.getName(offer),
        address: await this.getAddress(offer)
      },
      url
    };
  }

  async collectUrls(offersNodes) {
    return await Promise.all(
      offersNodes.map(async offerNode =>
        await this.getUrl(offerNode)
      ));
  }

  async executeBefore() { }

  async _scrapeEach(offersNodes) {
    const offers = [];
    const offersUrls = await this.collectUrls(offersNodes);

    for (const offerUrl of offersUrls) {
      await this._goToOffersPage(offerUrl);
      await this.executeBefore();

      const offer = await this.makeJobOffer(this.page);
      offers.push(offer);
    }

    return offers;
  }

  async _scrapeAll(offersNodes) {
    await this.executeBefore();

    const offers = offersNodes.map(
      async offerNode => await this.makeJobOffer(offerNode)
    );

    return await Promise.all(offers);
  }

  async getJobOffers(query) {
    await this._goToOffersPage(this.parseUrl(query));
    console.log(this.parseUrl(query));

    const offersNodes = await this._getOffersParentNodes();

    if (this.goToEach) {
      return await this._scrapeEach(offersNodes);
    }

    return await this._scrapeAll(offersNodes);
  }
}

module.exports = JobOffersScraper;