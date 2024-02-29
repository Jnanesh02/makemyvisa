const mongoose = require("mongoose");

const travelInsuranceSchema = new mongoose.Schema({
  fileName: {
    type: String,
  },
  key: {
    type: String,
  },
  insuranceName: {
    type: String,
    required: true,
    unique: true,
  },
  duration: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  countriesApplicable: [
    {
      type: String,

}
  ],
});
const travelInsuranceModel = mongoose.model(
  `travelInsuranceFile`,
  travelInsuranceSchema
);
module.exports = travelInsuranceModel;
