const express = require("express")
const router = express.Router()
const EquipmentModel = require("./db/equipment.model")

router
  .get("/", async (req, res, next) => {
    try {
      const equipments = await EquipmentModel.find()
      return res.json(equipments)
    } catch (err) {
      return next(err)
    }
  })
  .get("/:id", async (req, res, next) => {
    try {
      const equipment = await EquipmentModel.findById(req.params.id)
      return res.json(equipment)
    } catch (err) {
      return next(err)
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const equipment = await EquipmentModel.findById(req.params.id)
      const deleted = await equipment.delete()
      return res.json(deleted)
    } catch (err) {
      return next(err)
    }
  })
  .patch("/:id", async (req, res, next) => {
    try {
      const equipment = await EquipmentModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { new: true }
      )
      console.log(equipment)
      return res.json(equipment)
    } catch (err) {
      return next(err)
    }
  })
  .post("/", async (req, res, next) => {
    try {
      const newEquipment = new EquipmentModel(req.body)
      const createdEquipment = await newEquipment.save()
      return res.json(createdEquipment)
    } catch (err) {
      return next(err)
    }
  })

module.exports = router
