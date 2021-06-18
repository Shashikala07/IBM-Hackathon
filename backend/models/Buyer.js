const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BuyerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Applicant = mongoose.model("buyers", BuyerSchema);
