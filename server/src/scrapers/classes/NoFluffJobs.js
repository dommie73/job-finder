const JobOffersScraper = require('./JobOffersScraper');

const selectors = {
  parent: '.list-item .posting-list-item',
  title: '.posting-details-description h1',
  salary: '.posting-main-info.double-salary',
  name: '.posting-details-description h1 + a.inline-info > dl > dd',
  address: 'nfj-postings-locations .text-truncate'
};

class NoFluffJobs extends JobOffersScraper {
  constructor(page, { city, category }) {
    super(
      'No Fluff Jobs',
      `https://nofluffjobs.com/jobs/${city}/${category}`,
      page,
      selectors,
      true
    );
  }

  async executeBefore() {
    const cookieBtn = await this.page.$('.btn-accept-cookie');

    if (cookieBtn) {
      await cookieBtn.click();
      await this.page.waitForFunction(() =>
        !document.querySelector('bs-modal-backdrop')
      );
    }
  }

  async getSalary(offer) {
    return await offer.$$eval(
      this.selectors.salary,
      nodes => nodes.map(node =>
        node.innerText.replace(/(\n)+/g, ' ')
          .trim()).join(', ')
    );
  }
}

module.exports = NoFluffJobs;