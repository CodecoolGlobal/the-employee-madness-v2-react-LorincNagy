const mongoose = require("mongoose")

const { Schema } = mongoose

const EquipmentSchema = new Schema({
  name: {
    type: String,
    required: false, // Opcionális mező
  },
  type: {
    type: String,
    required: false, // Opcionális mező
  },
  amount: {
    type: Number,
    required: false, // Opcionális mező
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Equipment", EquipmentSchema)
