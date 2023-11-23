const express = require('express');
const { getChat, sendChat } = require('../controllers/chats.js');

const router = express.Router()

router.get('/*', getChat)
router.post('/', sendChat)

module.exports = router