const mongoose = require('mongoose');

const travelInsuranceSchema = new mongoose.Schema({
    fileName: {
        type:String,
    },
    countriesApplicable:[
        {
            type:String,
        }
    ]
});
const travelInsuranceModel = mongoose.model(`travelInsuranceFile`,travelInsuranceSchema);
module.exports = travelInsuranceModel;