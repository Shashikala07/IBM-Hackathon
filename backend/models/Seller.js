const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  contactno: {
    type: String,
    required: true,
  },
});

module.exports = Recruiter = mongoose.model("sellers", SellerSchema);
