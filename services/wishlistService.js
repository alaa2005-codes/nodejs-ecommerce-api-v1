
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

//@desc  Add product to wishlist 
//@route Post/api/v1/wishlist
//@access private/User
exports.addProductToWishlist = asyncHandler(async(req,res,next)=>
    {
        //$addToSet ==> add productId to wishlist array if productId not exist
        const user = await User.findByIdAndUpdate(req.user._id,
            {
                $addToSet : {wishlist : req.body.productId},
            },
            {new:true}
        ); 
        res.status(200).json({
            status: 'success',message : 'Product added successfully to your wishlist.'
            ,data:user.wishlist,
                            });
    })


//@desc  Remove product from wishlist 
//@route DELETE/api/v1/wishlist/:productId
//@access private/User
exports.removeProductFromWishlist = asyncHandler(async(req,res,next)=>
    {
        //$pull ==> remove productId from wishlist array if productId  exist
        const user = await User.findByIdAndUpdate(req.user._id,
            {
                $pull : {wishlist : req.params.productId},
            },
            {new:true}
        ); 
        res.status(200).json({
            status: 'success',message : 'Product removed successfully from your wishlist.'
            ,data:user.wishlist,
                            });
    })


//@desc  GET logged user wishlist 
//@route  GET/api/v1/wishlist
//@access private/Use
    exports.getLoggedUserWishlist = asyncHandler(async(req,res,next)=>
    {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.status(200).json({
            status:'success',
            results:user.wishlist.length,
            data:user.wishlist,});
    });