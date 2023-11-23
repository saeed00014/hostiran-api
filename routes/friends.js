const express = require('express');
const { deleteFriend, getFriends, sendFriend, getFriend, getFollows } = require('../controllers/friends.js');

const router = express.Router()

router.get('/f/*', getFriend)
router.get('/q/*', getFollows)
router.get('/*', getFriends)
router.post('/', sendFriend)
router.delete('/*', deleteFriend)

module.exports = router