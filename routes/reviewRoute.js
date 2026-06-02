const express = require('express');
const {createReviewValidator,
      UpdateReviewValidator,
      getReviewValidator,
      deleteReviewValidator
} =require('../utils/validators/reviewValidator'); 
// const 
// {
//       getReviewValidator, 
//       UpdateReviewValidator,
//       deleteReviewValidator,
//       createReviewValidator,
// }= require("../utils/validators/reviewValidator");


const 
{
      getReviews
      ,getReview
      ,createReview
      ,UpdateReview
      ,deleteReview
      ,createFilterObj
      ,setProductIdAndUserIdToBody
} = require('../services/reviewService');
const authService = require('../services/authService');
// mergeParams: Allow us to access parameters on other router
// ex: we need to access brandId from brand router 
const router = express.Router({mergeParams:true});

router
.route('/').get(createFilterObj,getReviews)
.post(
      authService.protect,
      authService.allowedTo('user'),
      setProductIdAndUserIdToBody
      ,createReviewValidator
      ,createReview
      );
router
.route('/:id')
.get(getReviewValidator,getReview)
.put(   
      authService.protect,
      authService.allowedTo('user'),
      UpdateReviewValidator
      ,UpdateReview
    )
.delete(   
      authService.protect,
      authService.allowedTo('user','manger','admin'),
      deleteReviewValidator,
      deleteReview);
module.exports= router;
