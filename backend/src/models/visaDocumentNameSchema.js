const mongoose = require("mongoose");
const visaDocumentNameSchema = new mongoose.Schema({
    documentName: {
        type: String,
        unique: true,
      },
      description: {
        type: String,
        required: true,
      },
});
const visaDocument = mongoose.model("visaDocument", visaDocumentNameSchema);
module.exports = visaDocument;