const express = require("express");
const itemsController = require('./items.controller')

const router = express.Router({mergeParams: true});

router.get("/",itemsController.getAll);

router.get("/:id", itemsController.getOneItem);

router.post("/", itemsController.createItem);

router.post("/:id", itemsController.editItem);

router.delete("/:id", itemsController.deleteItem);

module.exports = router;
