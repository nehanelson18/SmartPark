const express = require("express");

const router = express.Router();

const Customer = require("../../models/Customer");

var cors = require("cors");

router.use(cors());

router.get("/", (req, res) => {
  Customer.find()
    .then(customers => res.json(customers))
    .catch(err => res.status(400).json(err));
});

router.post("/addCustomer", (req, res) => {
  const newCustomer = new Customer({
    name: req.body.name,
    licensePlate: req.body.licensePlate,
    membershipNumber: Number(req.body.membershipNumber)
  });

  newCustomer
    .save()
    .then(customers =>
      res.json(customers).catch(err => res.status(400).json(err))
    );
});

router.get("/searchPlate/:licensePlate", (req, res) => {
  Customer.findOne({ licensePlate: req.params.licensePlate })
    .then(customers => res.json(customers))
    .catch(err => res.status(400).json(err));
});

router.delete("/deleteCustomer/:name", (req, res) => {
  Customer.findOne({ name: req.params.name })
    .then(customers =>
      customers.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json(err));
});

module.exports = router;
