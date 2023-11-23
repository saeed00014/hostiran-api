const express = require("express");
const { getUsers, getOneUser, getFillterUser, putAvatarUser } = require("../controllers/users.js");

const router = express.Router()

router.get('/', getUsers)
router.get('/s/*', getFillterUser)
router.get('/*', getOneUser)
router.put('/*', putAvatarUser)

module.exports = router