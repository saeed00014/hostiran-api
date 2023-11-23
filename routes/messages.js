const express = require('express');
const { deleteMessage, getMessages, sendMessage } = require('../controllers/messages.js');

const router = express.Router()

router.post('/', sendMessage)
router.get('/*', getMessages)
router.delete('/*', deleteMessage)

module.exports = router