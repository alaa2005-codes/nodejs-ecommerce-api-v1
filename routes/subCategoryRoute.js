const express = require('express');
const { 
    createSubCategory,
    getSubCategory,
    getSubCategories,
    createFilterObj,
    setCategoryIdToBody,
    UpdateSubCategory,
    deleteSubCategory,
} = require('../services/subCategoryService');

const authService = require('../services/authService');

const { createSubCategoryValidator,
    getSubCategoryValidator,
    UpdateSubCategoryValidator,
    deleteSubCategoryValidator,
 } = require('../utils/validators/subCategoryValidator');

const router = express.Router();


router.route('/')
.post(
    authService.protect,
    authService.allowedTo('admin','manger'),
    setCategoryIdToBody,
    createSubCategoryValidator, 
    createSubCategory
)
.get(createFilterObj,getSubCategories);
router.route('/:id')
.get(getSubCategoryValidator,getSubCategory)
.put(
    authService.protect,
    authService.allowedTo('admin','manger'),
    UpdateSubCategoryValidator,
    UpdateSubCategory)
.delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteSubCategoryValidator,
    deleteSubCategory);
module.exports = router;