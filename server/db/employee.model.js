const mongoose = require("mongoose")

const { Schema } = mongoose

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  equipment: String,
  favoriteBrand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Employee", EmployeeSchema)
