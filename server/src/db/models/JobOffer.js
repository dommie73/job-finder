const { model, Schema } = require("mongoose");

const jobOfferSchema = new Schema(
  {
    from: String,
    title: String,
    salary: String,
    company: {
      name: String,
      address: String
    },
    url: String
  },
  { timestamps: true }
);

const JobOffer = model("JobOffer", jobOfferSchema);

module.exports = JobOffer;
