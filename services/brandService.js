const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const factory     = require('./handlersFactory');
const {uploadSingleImage} = require('../middlewares/uploadimageMiddleware');
const Brand = require('../models/brandModel');

//upload single image
exports.uploadBrandImage = uploadSingleImage("image");
//image processing
exports.resizeImage = asyncHandler( async(req,res,next)=>
    {
        const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`upload/brands/${filename}`);
        //save image into our db
        req.body.image = filename;
        next();
    });
//@desc Get List of brands
//@route Get/api/v1/brands
//@access Public
exports.getBrands = factory.getAll(Brand);
//@desc   Get specific Brand by id
//@route  Get/api/v1/brands/:id
//@access Public
exports.getBrand = factory.getOne(Brand);
//@desc  Create brand
//@route POST /api/v1/brands
//@access private
exports.createBrand = factory.createOne(Brand);

//@desc   Update specific brand
//@route  PUT /api/v1/brands
//@access private
exports.UpdateBrand = factory.updateOne(Brand);
//@desc   Delete specific brand
//@route  Delete /api/v1/brands
//@access private

exports.deleteBrand = factory.deleteOne(Brand);