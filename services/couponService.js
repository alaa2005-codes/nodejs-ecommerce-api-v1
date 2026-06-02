const factory     = require('./handlersFactory');
const Coupon = require('../models/couponModel');


//@desc Get List of coupons
//@route Get/api/v1/coupons
//@access Private/Admin_Manger
exports.getCoupons = factory.getAll(Coupon);
//@desc   Get specific Coupon by id
//@route  Get/api/v1/coupons/:id
//@access Private/Admin_Manger
exports.getCoupon = factory.getOne(Coupon);
//@desc  Create coupon
//@route POST /api/v1/coupons
//@access Private/Admin_Manger
exports.createCoupon = factory.createOne(Coupon);

//@desc   Update specific coupon
//@route  PUT /api/v1/coupons
//@access Private/Admin_Manger
exports.UpdateCoupon = factory.updateOne(Coupon);
//@desc   Delete specific coupon
//@route  Delete /api/v1/coupons
//@access Private/Admin_Manger

exports.deleteCoupon = factory.deleteOne(Coupon);