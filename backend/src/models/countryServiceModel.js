const mongoose = require("mongoose");
const countryServiceSchema = new mongoose.Schema({
    countryName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image: {
        type: String 
    },
    serviceTypes:[
        {
       serviceName:{
        type:String,
        required:true,
       }
    }
    ]
});
const countryService = mongoose.model("countryServices", countryServiceSchema);
module.exports = countryService;