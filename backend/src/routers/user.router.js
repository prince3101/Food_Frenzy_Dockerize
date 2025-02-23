const express = require("express");
const { GenerateBill, getBills, updateBill } = require("../controller/user.controller");
const router = express.Router()

router.post('/generate-bill', GenerateBill);
router.get('/getBill',getBills);
router.put('/bill/:id', updateBill);

module.exports = router;