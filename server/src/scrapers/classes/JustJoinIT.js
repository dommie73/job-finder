const JobOffersScraper = require("./JobOffersScraper");

const selectors = {
  parent: "offer-item > .item",
  title: ".item-row > .primary-line > .title",
  salary: ".item-row > .primary-line .salary",
  name: ".item-row > .secondary-line > .company-info > .company-name",
  address: ".item-row > .secondary-line > .company-info .company-address"
};

class JustJoinIT extends JobOffersScraper {
  constructor(page) {
    super("Just Join IT", `https://justjoin.it`, page, selectors, {}, false);
  }

  async _getOffersParentNodes() {
    const sliceIndex = await this.page.$$eval(this.selectors.parent, nodes =>
      nodes.findIndex(node =>
        node.parentNode.parentNode.classList.contains("first-other-place-item")
      )
    );

    const parentsHandle = await this.page.$$(this.selectors.parent);

    return parentsHandle.slice(0, sliceIndex);
  }
}

module.exports = JustJoinIT;
