const mongoose = require("mongoose");
const subServiceTypeSchema = new mongoose.Schema({
    subServiceName: {
        type: String,
    },
    description: {
        type: String,
    },
});
const serviceTypeSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    subServiceTypes: [subServiceTypeSchema],
});
const countryServiceSchema = new mongoose.Schema({
    countryName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    countryImagePath: { type: String, required: true },
    flagImagePath: { type: String, required: true },
    serviceTypes: [serviceTypeSchema],
});
const countryService = mongoose.model("countryServices", countryServiceSchema);
module.exports = countryService;