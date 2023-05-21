require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.query; //sortBy=name&sortOrder=desc, vagy sortBy=position&sortorder=asc, vagy sortBy=level&sortorder=asc
    //req.querry egy object

    let sortOptions = {};

    if (sortBy && sortOrder) {
      //ha van értéke sortBynak és sortOrdernek akkor :sortOptions nek legyen egy kulcs és egy value-ja
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1; //pl ilyen lesz {name:-1}, vagy {level:-1}, vagy {position:1}
    }

    const employees = await EmployeeModel.find().sort(sortOptions); //sort()egy objectet vár ez lesz maga sortOrder pl ilyen lesz name:"desc", vagy level:"desc"
    // const employees2 = await EmployeeModel.find(query).sort({ name: "desc" });
    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

const userRouter = require("./equipmentRoutes");

app.use("/api/equipments/", userRouter);
