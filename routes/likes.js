const express = require('express');
const { sendDisLike, sendLike, getPostLikes } = require('../controllers/likes.js');

const router = express.Router()

router.get('/*', getPostLikes)
router.post('/', sendLike)
router.delete('/*', sendDisLike)

module.exports = router