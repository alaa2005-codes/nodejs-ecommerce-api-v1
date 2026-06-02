const express = require('express');
const multer = require('multer');
const 
{
     getCategoryValidator, 
     UpdateCategoryValidator,
      deleteCategoryValidator,
      createCategoryValidator,

}= require("../utils/validators/categoryValidator");
const 
{
     getCategories
     ,getCategory
     ,createCategory
     ,UpdateCategory
     ,deleteCategory
     ,uploadCategoryImage
     ,resizeImage
} = require('../services/categoryService');

const authService = require('../services/authService')
// mergeParams: Allow us to access parameters on other router
// ex: we need to access categoryId from category router 
const router = express.Router({mergeParams:true});
//Nested route
const subcategoriesRoute = require('./subCategoryRoute');
router.use('/:categoryId/subcategories',subcategoriesRoute);
router
.route('/')
.get(getCategories)
.post(
     authService.protect,
     authService.allowedTo('admin','manger'),
     uploadCategoryImage
     ,resizeImage
     ,createCategoryValidator
     ,createCategory
     );
router
.route('/:id')
.get(getCategoryValidator,getCategory)
.put(authService.protect,
     authService.allowedTo('admin','manger'),
     uploadCategoryImage
     ,resizeImage
     ,UpdateCategoryValidator
     ,UpdateCategory
     )
.delete(
     authService.protect,
     authService.allowedTo('admin'),
     deleteCategoryValidator,
     deleteCategory
);
module.exports= router;
