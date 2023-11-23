const express = require('express');
const { deletePost, getPosts, getPost, sendPost } = require('../controllers/posts.js');

const router = express.Router()

router.get('/', getPosts)
router.get('/*', getPost)
router.post('/', sendPost)
router.delete('/*', deletePost)

module.exports = router