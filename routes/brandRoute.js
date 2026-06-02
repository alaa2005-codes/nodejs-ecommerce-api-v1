const express = require('express');
const 
{
      getBrandValidator, 
      UpdateBrandValidator,
      deleteBrandValidator,
      createBrandValidator,
}= require("../utils/validators/brandValidator");

const authService = require('../services/authService');

const 
{
      getBrands
      ,getBrand
      ,createBrand
      ,UpdateBrand
      ,deleteBrand
      ,uploadBrandImage
      ,resizeImage,
} = require('../services/brandService');
// mergeParams: Allow us to access parameters on other router
// ex: we need to access brandId from brand router 
const router = express.Router();

router
.route('/').get(getBrands)
.post(
      authService.protect,
      authService.allowedTo('admin','manger'),
      uploadBrandImage
      ,resizeImage
      ,createBrandValidator
      ,createBrand
      );
router
.route('/:id')
.get(getBrandValidator,getBrand)
.put(   
      authService.protect,
      authService.allowedTo('admin','manger'),
      uploadBrandImage
      ,resizeImage 
      ,UpdateBrandValidator
      ,UpdateBrand
    )
.delete(   
      authService.protect,
      authService.allowedTo('admin'),
      deleteBrandValidator,deleteBrand);
module.exports= router;
