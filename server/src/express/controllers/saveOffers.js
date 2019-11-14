const { JobOffer } = require("../../db/models");

const saveOffers = async offers => {
  try {
    for (const offer of offers) {
      const offerFromDb = await JobOffer.findOne({ url: offer.url });
      if (offerFromDb) {
        await offerFromDb.updateOne({
          $addToSet: { category: offer.category }
        });
        return;
      }
      const jobOffer = new JobOffer(offer);
      jobOffer.save();
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = saveOffers;
