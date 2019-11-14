const { JobOffer } = require("../../db/models");

const compareAndSaveOffers = offers => {
  try {
    for (const offer of offers) {
      const jobOffer = new JobOffer(offer);
      jobOffer.save().catch(err => console.log(err));
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = compareAndSaveOffers;
