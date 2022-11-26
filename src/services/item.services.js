const Item = require("../models/Item"),
  {StatusCodes,ReasonPhrases} = require('http-status-codes');
const HTTPErrors = require("../utils/errors/HTTPErros");

const { logger } = require("../utils/Logger");

/**
 * Create a new Item
 * 
 * @param {Object} createItemInput 
 * @param {string} createItemInput.title
 * @param {string?} createItemInput.description
 * @returns {Object} new created item
 */
exports.createItem = async (createItemInput) => {
  try {
    const title = createItemInput.title;
    const description = createItemInput.description;

    let item = new Item(title, description);

    item = await item.save();

    return {
      title: item.title,
      description: item.description,
      id: item.id,
    };
  } catch (error) {
    throw error
  }
};

/**
 * Get all items 
 * 
 * @param {number} page
 * @param {number} offset  
 * @returns {Array} List of items
 */
exports.getAllItems = async (page,offset) => {
  try {
    let data = await Item.findAll();
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get an item by id 
 * 
 * @param {String} id 
 * @returns {Object} an item  
 */
exports.getOneItem = async (id) => {
    try {
        let data = await Item.findById(id);
        if(!data) {
            logger.info(`Cannot find item with id ${id}`)
            throw new HTTPErrors(StatusCodes.NOT_FOUND,`Cannot find item with id ${id}`,ReasonPhrases.NOT_FOUND)
        }
        return data
    } catch (error) {
       throw error 
    }
}

/**
 * Edit an item
 * 
 * @param {Object} updateItemInput
 * @param {title?} updateItemInput.title
 * @param {description} updateItemInput.description
 * @returns {Object} new updated item
 */
exports.editItem = async(id,updateItemInput) => {
  try {
    await this.getOneItem(id);
    await Item.update(id,updateItemInput);
    return;
  } catch (error) {
    throw(error)
  }
}

/**
 * Delete an item by id
 * 
 * @param {*} id 
 */
exports.deleteItem = async (id) => {
    try {
        await this.getOneItem(id);
        await Item.delete(id);
    } catch (error) {
        throw error
    }
}
