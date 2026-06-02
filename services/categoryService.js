const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const sharp = require('sharp');

const factory     = require('./handlersFactory');
const {uploadSingleImage} = require('../middlewares/uploadimageMiddleware');
const Category = require('../models/categoryModel');

//upload single image
exports.uploadCategoryImage = uploadSingleImage("image");
//image processing
exports.resizeImage = asyncHandler( async(req,res,next)=>
    {
        const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
        if(req.file)
            {
        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`upload/categories/${filename}`);
        req.body.image = filename;
            }
        next();
    });
//@desc Get List of Categories
//@route Get/api/v1/Categories
//@access Public
exports.getCategories = factory.getAll(Category);
//@desc   Get specific category by id
//@route  Get/api/v1/Categories/:id
//@access Public
exports.getCategory = factory.getOne(Category);
//@desc  Create Categories
//@route POST /api/v1/Categories
//@access private/Admin-Manager
exports.createCategory = factory.createOne(Category);

//@desc   Update specific category
//@route  PUT /api/v1/Categories
//@access private/Admin-Manager
exports.UpdateCategory = factory.updateOne(Category);
//@desc   Delete specific category
//@route  Delete /api/v1/Categories
//@access private/Admin

exports.deleteCategory = factory.deleteOne(Category);