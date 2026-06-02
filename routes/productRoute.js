const express = require('express');
const 
{
     getProductValidator, 
     UpdateProductValidator,
      deleteProductValidator,
      createProductValidator,
}= require("../utils/validators/productValidator");


const 
{
     getProducts
     ,getProduct
     ,createProduct
     ,UpdateProduct
     ,deleteProduct
     ,uploadProductImages
     ,resizeProductImages
} = require('../services/productService');
// mergeParams: Allow us to access parameters on other router
// ex: we need to access categoryId from category router 
const authService = require('../services/authService');
const reviewsRoute = require('../routes/reviewRoute');
const router = express.Router({mergeParams:true});

//Post /products/jsfsfjsjssfsd/reviews
//Get  /products/dssdddddddddd/reviews
//Get  /products/safdsasdfsfsf/reviews/asdfsfafafda
router.use('/:productId/reviews',reviewsRoute);
router
.route('/')
.get(getProducts)
.post(
     authService.protect,
     authService.allowedTo('admin','manger'),
     uploadProductImages
     ,resizeProductImages
     ,createProductValidator
     ,createProduct
     );
router
.route('/:id')
.get(getProductValidator,getProduct)
.put(
     authService.protect,
     authService.allowedTo('admin','manger'),
     uploadProductImages
     ,resizeProductImages
     ,UpdateProductValidator,UpdateProduct)
.delete(
     authService.protect,
     authService.allowedTo('admin'),
     deleteProductValidator,
     deleteProduct
     );
module.exports= router;
