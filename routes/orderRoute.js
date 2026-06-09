const express = require('express');


const { createCashOrder,
    findAllOrders,
    findSpecificOrder,
    filterOrderForLoggedUser,
    UpdateOrderToPaid,
    UpdateOrderToDelivered,
    checkoutSession,
} = require('../services/orderService');

const authService = require('../services/authService');

const router = express.Router();

router.use(authService.protect);

router.get('/checkout-session/cartId',authService.allowedTo('user'),checkoutSession);


router.route('/:cartId').post(authService.allowedTo('user'),createCashOrder);
router.get('/',authService.allowedTo('user','admin','manger')
,filterOrderForLoggedUser
,findAllOrders);
router.get('/:id',findSpecificOrder);
router.put('/:id/pay',authService.allowedTo('admin','manger'),UpdateOrderToPaid);
router.put('/:id/deliver',authService.allowedTo('admin','manger'),UpdateOrderToDelivered);
module.exports = router;