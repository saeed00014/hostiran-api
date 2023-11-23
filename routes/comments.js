const express = require("express");
const { deleteComment, getComments, sendComment, getCommentsQ } = require("../controllers/comments.js");

const router = express.Router()

router.get('/q/*', getCommentsQ)
router.get('/*', getComments)
router.post('/', sendComment)
router.delete('/*', deleteComment)

module.exports = router