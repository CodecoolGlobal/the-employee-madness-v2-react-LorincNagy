const mongoose = require("mongoose")

const { Schema } = mongoose

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: false, // Opcionális mező
  },
  level: {
    type: String,
    required: false, // Opcionális mező
  },
  position: {
    type: String,
    required: false, // Opcionális mező
  },
  equipment: {
    type: String,
    required: false, // Opcionális mező
  },
  favoriteBrand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: false, // Opcionális mező
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

const EmployeeModel = mongoose.model("Employee", EmployeeSchema)

module.exports = EmployeeModel
