const express = require("express");
const { deleteCard, getProduct, getProducts, patchCard, postProduct } = require("../controllers/product.js");

const router = express.Router()

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', postProduct)

router.delete('/:id', deleteCard)

router.patch('/:id', patchCard)

module.exports = router