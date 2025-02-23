const express = require("express");
const { addCategory, getCategory, deleteCategory, updateCategory, getCategoryDetail, getDashboardCount } = require("../controller/category.controller");
const router = express.Router()

router.post('/category/add', addCategory);
router.get('/category', getCategory);
router.get('/dashboard', getDashboardCount);
router.get('/category/:id', getCategoryDetail);
router.delete('/category-delete/:id', deleteCategory);
router.put('/category/:id', updateCategory);
// router.post('/login', LoginUser);

module.exports = router;