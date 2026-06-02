const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const ApiError = require('../utils/apiError');

const factory     = require('./handlersFactory');
const {uploadSingleImage} = require('../middlewares/uploadimageMiddleware');
const User = require('../models/userModel');
const createToken =  require('../utils/createToken');
const bcrypt = require('bcryptjs');


//upload single image
exports.uploadUserImage = uploadSingleImage("profileImg");
//image processing
exports.resizeImage = asyncHandler( async(req,res,next)=>
    {
        const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
        if(req.file){
        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`upload/users/${filename}`);
        //save image into our db
        req.body.profileImg = filename;
        }
        next();
    });
//@desc Get List of users
//@route Get/api/v1/users
//@access private/Admin
exports.getUsers = factory.getAll(User);
//@desc   Get specific User by id
//@route  Get/api/v1/users/:id
//@access private/Admin
exports.getUser = factory.getOne(User);
//@desc  Create user
//@route POST /api/v1/users
//@access private/Admin
exports.createUser = factory.createOne(User);

//@desc   Update specific user
//@route  PUT /api/v1/users
//@access private/Admin
exports.UpdateUser = asyncHandler(async(req,res,next)=>{
const document = await User.findByIdAndUpdate(req.params.id,
    { name: req.body.name,
        slug:req.body.slug,
        phone:req.body.phone,
        email:req.body.email,
        profileImg:req.body.profileImg,
        role:req.body.role,
    },
{
    new :true,
});
if(!document)
    {
        return next(new ApiError(`No Brand for this id ${req.params.id}`, 404));     }
        res.status(200).json({data : document});
});
exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const document = await User.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangeAt: Date.now(),
        },
        { new: true },
    );

    if (!document) {
        return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }

    res.status(200).json({ data: document });
});
//@desc   Delete specific user
//@route  Delete /api/v1/users
//@access private/Admin

exports.deleteUser = factory.deleteOne(User);

//@desc   Get Logged user data 
//@route  Get/api/v1/users/getMe
//@access private/protect
exports.getLoggedUserData = asyncHandler(async(req,res,next)=>
    {
        req.params.id  = req.user._id;
        next();
    })
//@desc   Update Logged user password
//@route  Put/api/v1/users/updateMyPassword
//@access private/protect
exports.updateLoggedUserPassword = asyncHandler(async(req,res,next)=>
    {
        //1)Update user password based user payload (req.user._id)
        const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangeAt: Date.now(),
        },
        { new: true },
    );
    //2)Generate Token 
    const token = createToken(user._id);
    res.status(200).json({data:user,token});
    });
//@desc   Update Logged user data (without password,role)
//@route  Put/api/v1/users/updateMe
//@access private/protect
exports.updateLoggedUserData = asyncHandler(async(req,res,next)=>
{
    const updatedUser = await User.findByIdAndUpdate(req.user._id,
    {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
    },{new:true});
    res.status(200).json({data:updatedUser});
});
//@desc   Deactivate Logged user
//@route  DELETE/api/v1/users/deleteMe
//@access private/protect
exports.deleteLoggedUserData = asyncHandler(async(req,res,next)=>
{
    await User.findByIdAndUpdate(req.user._id,{active : false});
    res.status(204).json({status:'Success'});
});