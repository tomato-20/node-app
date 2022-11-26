const express = require("express");
const CreateItemValidation = require("../../../middleweres/validation/createItemValidation");
const UpdateItemValdiation = require("../../../middleweres/validation/updateItemValidation");
const itemsController = require('./items.controller')

const router = express.Router({mergeParams: true});

router.get("/",itemsController.getAll);

router.get("/:id", itemsController.getOneItem);

router.post("/", CreateItemValidation,itemsController.createItem);

router.post("/:id", UpdateItemValdiation,itemsController.editItem);

router.delete("/:id", itemsController.deleteItem);

module.exports = router;
