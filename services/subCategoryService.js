const SubCategory = require('../models/subCategoryModel');
const factory     = require('./handlersFactory');

exports.setCategoryIdToBody = (req,res,next)=>
{
        //Nested route(create)
        if(!req.body.category) req.body.category= req.params.categoryId;
    next();
}

//Nested route
// GET /api/v1/categories/:categoryId/subcategories

exports.createFilterObj = (req,res,next) =>
   {
      let filterObject = {};
    if(req.params.categoryId)filterObject = {category:req.params.categoryId};
    req.filterObj = filterObject;
    next();
}
//@desc  Create subCategories
//@route POST /api/v1/Categories
//@access private
exports.createSubCategory = factory.createOne(SubCategory);
//@desc   Get List of Subcategories
//@route  Get/api/v1/Subcategories
//@access Public
exports.getSubCategories = factory.getAll(SubCategory);
//@desc   Get specific subcategory by id
//@route  Get/api/v1/subCategories/:id
//@access Public
exports.getSubCategory = factory.getOne(SubCategory);
    // .populate({path:"category",select: 'name -_id'});
//@desc   Update specific subcategory
//@route  PUT /api/v1/subCategories
//@access private
exports.UpdateSubCategory = factory.updateOne(SubCategory);
//@desc   Delete specific subcategory
//@route  Delete /api/v1/subCategories
//@access private

exports.deleteSubCategory = factory.deleteOne(SubCategory);