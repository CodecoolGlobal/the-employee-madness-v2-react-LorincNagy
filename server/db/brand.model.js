const mongoose = require("mongoose");

const { Schema } = mongoose;

const BrandSchema = new Schema({
  name: {
    type: String,
    required: false, // Opcionális mező
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Brand", BrandSchema);
