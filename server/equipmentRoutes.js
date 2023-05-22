const express = require("express")
const router = express.Router()
const EquipmentModel = require("./db/equipment.model")

router.get("/api/equipments/", async (req, res, next) => {
  try {
    const equipments = await EquipmentModel.find()
    return res.json(equipments)
  } catch (err) {
    return next(err)
  }
})

module.exports = router
