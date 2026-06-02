const factory     = require('./handlersFactory');
const Review = require('../models/reviewModel');


//Nested route
// GET /api/v1/products/:productId/reviews

exports.createFilterObj = (req,res,next) =>
   {
      let filterObject = {};
    if(req.params.productId)filterObject = {product:req.params.productId};
    req.filterObj = filterObject;
    next();
}
//@desc Get List of reviews
//@route Get/api/v1/reviews
//@access Public
exports.getReviews = factory.getAll(Review);
//@desc   Get specific Review by id
//@route  Get/api/v1/review/:id
//@access Public
exports.getReview = factory.getOne(Review);

        //Nested route(create)
exports.setProductIdAndUserIdToBody = (req,res,next)=>
{
        if(!req.body.product) req.body.product= req.params.productId;
        if(!req.body.user) req.body.user = req.user._id;
    next();
}
//@desc  Create review
//@route POST /api/v1/reviews
//@access private/protect/User
exports.createReview = factory.createOne(Review);

//@desc   Update specific review
//@route  PUT /api/v1/reviews
//@access private/protect/User
exports.UpdateReview = factory.updateOne(Review);
//@desc   Delete specific review
//@route  Delete /api/v1/reviews
//@access private/protect/User-Admin-Manager

exports.deleteReview = factory.deleteOne(Review);