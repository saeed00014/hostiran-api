const express = require("express");
const { login, logout, signup, validateToken } = require("../controllers/auths.js");

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/vt', validateToken)
router.delete('/logout/*', logout)

module.exports = router