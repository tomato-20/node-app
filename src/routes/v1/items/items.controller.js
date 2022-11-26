const itemServices = require('../../../services/item.services');


// get list of all items
const getAll = async(req, res, next) => {
  const page = req.query.page,
    offset = req.query.offset;
  try {
    let data = await itemServices.getAllItems(page,offset);
    res.json({
      data
    })
  } catch (error) {
    next(error);
  }
};

// get an item by id
const getOneItem = async(req, res, next) => {
  try {
    let data = await itemServices.getOneItem(req.params.id);
    res.json({
      data
    }) 
  } catch (error) {
    next(error)
  }
};

// add an item
const createItem = async (req, res, next) => {
  try {
    let result = await itemServices.createItem(req.body);
    res.json({
      data : result
    })
  } catch (error) {
    next(error)
  }
};

// edit an item
const editItem = async (req, res, next) => {
  try {
    let result = await itemServices.editItem(req.params.id,req.body);
    res.json({
      msg : "Update successful"
    })
  } catch (error) {
    next(error)
  }
};

// delete an item
const deleteItem = async (req, res, next) => {
  try {
    await itemServices.deleteItem(req.params.id)
    res.json({
      mesage: 'Deletion successful'
    })
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAll,
  getOneItem,
  createItem,
  editItem,
  deleteItem,
};
