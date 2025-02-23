const express = require("express");
const router = express.Router()
const{addInventory, getInventory, getInventoryByCat, getInventoryByFood, deleteInventory, updateInventory, getInventoryDetails} = require("../controller/inventory.controller")

router.post('/inventory/add', addInventory);
router.get('/inventory', getInventory)
router.get('/inventory/:id', getInventoryDetails);
router.get('/inventory-by-cat/:id', getInventoryByCat)
router.get('/inventory-by-food/:name/:item/:price', getInventoryByFood)
router.delete('/inventory-delete/:id', deleteInventory );
router.put('/inventory/:id', updateInventory);
// router.post('/login', LoginUser);

module.exports = router;