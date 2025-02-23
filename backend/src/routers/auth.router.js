const express = require("express");
const { SignUp, LoginUser, getUserData, userDelete } = require("../controller/auth.controller");
const router = express.Router()

router.post('/sign-up', SignUp);
router.post('/login', LoginUser);
router.get('/users', getUserData);
router.delete('/user-delete/:id', userDelete)

module.exports = router;