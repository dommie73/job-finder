const JobOffersScraper = require("./JobOffersScraper");

const {
  arrayToObjectUppercase,
  getInnerTextWithNoWhitespace
} = require("../utils");

const categories = require("../queries/categories");
const cities = require("../queries/cities");

const queries = {
  cities: {
    ...arrayToObjectUppercase(cities)
  },
  categories: {
    ...arrayToObjectUppercase(categories)
  }
};

const selectors = {
  parent: ".offer.all-container",
  title: ".offer__text__grid__title > h3",
  salary: ".offer__salary > h4",
  name: ".offer__text__grid__title > h4 > .ng-star-inserted",
  address: ".offer__location.ng-star-inserted"
};

class JobsForGeek extends JobOffersScraper {
  constructor(page) {
    super(
      "Jobs For Geek",
      `https://jobsforgeek.com/job-offers?country=POLAND`,
      page,
      selectors,
      queries,
      false
    );
  }

  parseUrl({ city, category }) {
    const cityUrl = city !== "all" ? `&city=${this.queries.cities[city]}` : "";
    const categoryUrl =
      category !== "all"
        ? `&technology=${this.queries.categories[category]}`
        : "";
    return this.websiteUrl + cityUrl + categoryUrl;
  }

  async getSalary(offer) {
    return await offer.$eval(
      this.selectors.salary,
      getInnerTextWithNoWhitespace
    );
  }

  async getAddress(offer) {
    return await offer.$eval(
      this.selectors.address,
      getInnerTextWithNoWhitespace
    );
  }
}

module.exports = JobsForGeek;
