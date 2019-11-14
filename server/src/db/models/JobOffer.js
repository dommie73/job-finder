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
    url: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

const JobOffer = model("job-offer", jobOfferSchema);

module.exports = JobOffer;
