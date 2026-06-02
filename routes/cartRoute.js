const express = require('express');
const {
    AddProductToCart,
    getLoggedUserCart,
    removeSpecificCarItem,
    clearCart,
    updateCartItemQuantity,
    applyCoupon,
} = require('../services/cartService');

const authService = require('../services/authService');

const router = express.Router();
router.use(authService.protect,authService.allowedTo('user'));
router.route('/')
.post(AddProductToCart)
.get(getLoggedUserCart)
.delete(clearCart);

router.put('/applyCoupon',applyCoupon);

router.route('/:itemId')
.put(updateCartItemQuantity)
.delete(removeSpecificCarItem);

module.exports= router;
