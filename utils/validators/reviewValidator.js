const {check,body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Review = require('../../models/reviewModel');
const { promises } = require('nodemailer/lib/xoauth2');
exports.createReviewValidator = [
    check('title').optional(),
    check('ratings').notEmpty().withMessage('ratings value required')
    .isFloat({min:1,max:5}).withMessage('ratings value must to be between 1 to 5'),
    check('user').isMongoId().withMessage('Invalid Review id'),
    check('product').isMongoId().withMessage('Invalid Review id')
    .custom((val,{req})=>
        {
            //check if logged user create review before
        return Review.findOne({user:req.user._id,product:req.body.product}).then((review)=> 
            {
                if(review)
                    {
                        return Promise.reject(new Error('You already created a review before'))
                    };
            }
        )
        }),
    validatorMiddleware,
]
exports.getReviewValidator = [
check('id').isMongoId().withMessage('Invalid Brand id'),validatorMiddleware,
];
exports.UpdateReviewValidator = [
check('id').isMongoId().withMessage('Invalid Review id')
.custom((val,{req})=>
    {
        //check review ownership before update 
        return Review.findById(val).then((review)=>
            {
                if(!review)
                    {
                        return Promise.reject(new Error(`There is no review with id ${val}`));
                    };
                if(review.user._id.toString() != req.user._id.toString())
                {
                return Promise.reject(new Error(`Your are not allowed to perform this action`));
                }
            }
        )
        }),
validatorMiddleware,
];

exports.deleteReviewValidator = [
check('id').isMongoId().withMessage('Invalid Review id')
.custom((val,{req})=>
    {
        //check review ownership before update 
        if(req.user.role == 'user'){
        return Review.findById(val).then((review)=>
            {
            if(!review)
                    {
                        return Promise.reject(new Error(`There is no review with id ${val}`));
                    };
                if(review.user._id.toString() != req.user._id.toString())
                {
                return Promise.reject(new Error(`Your are not allowed to perform this action`));
                }
            }
        )}
            return true;
    }),validatorMiddleware,
];