const JobOffersScraper = require("./JobOffersScraper");

const categories = require("../queries/categories");
const { arrayToObject } = require("../utils");

const selectors = {
  parent: ".list-item .posting-list-item",
  title: ".posting-details-description h1",
  salary: ".posting-main-info.double-salary",
  name: ".posting-details-description h1 + a.inline-info > dl > dd",
  address: "nfj-postings-locations .text-truncate"
};

const queries = {
  categories: {
    ...arrayToObject(categories),
    c: "c%2B%2B",
    net: ".net"
  }
};

class NoFluffJobs extends JobOffersScraper {
  constructor(page) {
    super(
      "No Fluff Jobs",
      `https://nofluffjobs.com/jobs`,
      page,
      selectors,
      queries,
      true
    );
  }

  parseUrl({ city, category }) {
    return [
      this.websiteUrl,
      this.queries.cities[city],
      this.queries.categories[category]
    ]
      .join("/")
      .replace(/(\/all(?=(\/|$)))+/, "");
  }

  async collectUrls(offersNodes, query) {
    const offersUrls = await Promise.all(
      offersNodes.map(async offerNode => await this.getUrl(offerNode))
    );
    return offersUrls.filter(offerNode => offerNode.match(query.city));
  }

  async executeBefore() {
    const cookieBtn = await this.page.$(".btn-accept-cookie");

    if (cookieBtn) {
      await cookieBtn.click();
      await this.page.waitForFunction(
        () => !document.querySelector("bs-modal-backdrop")
      );
    }
  }

  async getSalary(offer) {
    return await offer.$$eval(this.selectors.salary, nodes =>
      nodes.map(node => node.innerText.replace(/(\n)+/g, " ").trim()).join(", ")
    );
  }
}

module.exports = NoFluffJobs;
