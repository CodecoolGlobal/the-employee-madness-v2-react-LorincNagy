/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config()
const mongoose = require("mongoose")
const names = require("./names.json")
const levels = require("./levels.json")
const positions = require("./positions.json")
const equipments = require("./equipments.json")
const brandNames = require("./brands.json")
const EmployeeModel = require("../db/employee.model")
const EquipmentModel = require("../db/equipment.model")
const BrandModel = require("../db/brand.model")

const mongoUrl = process.env.MONGO_URL

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable")
  process.exit(1) // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))]

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({})

  const brands = await BrandModel.find({}, "_id") // Az összes márka lekérdezése az azonosítóikkal

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    equipment: pick(equipments), // Véletlenszerűen válassz egy eszközt az equipments tömbből
    favoriteBrand: pick(brands)._id, // Véletlenszerűen válassz egy márka azonosítót
  }))

  await EmployeeModel.create(...employees)
  console.log("Employees created")
}

const populateEquipments = async () => {
  await EquipmentModel.deleteMany({})

  const equipmentData = equipments.map((equipment) => ({
    name: equipment,
    type: "Type",
    amount: 0,
    created: new Date(),
  }))

  await EquipmentModel.create(...equipmentData)
  console.log("Equipments created")
}

const populateBrands = async () => {
  await BrandModel.deleteMany({})

  const brands = brandNames.map((name) => ({
    name,
  }))
  await BrandModel.create(...brands)
  console.log("Brands created")
}

const main = async () => {
  await mongoose.connect(mongoUrl)

  await populateEmployees()
  await populateEquipments()
  await populateBrands()

  await mongoose.disconnect()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
