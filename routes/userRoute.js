const express = require('express');
const 
{
      getUserValidator,
      createUserValidator,
      UpdateUserValidator,
      deleteUserValidator,
      changeUserPasswordValidator,
      UpdateLoggedUserValidator,
}= require("../utils/validators/userValidator");
const 
{
      getUsers
      ,getUser
      ,createUser
      ,UpdateUser
      ,deleteUser
      ,uploadUserImage
      ,resizeImage
      ,changeUserPassword
      ,getLoggedUserData
      ,updateLoggedUserPassword
      ,updateLoggedUserData
      ,deleteLoggedUserData
} = require('../services/userService');

const authService = require('../services/authService');

// mergeParams: Allow us to access parameters on other router
// ex: we need to access brandId from brand router 
const router = express.Router();

router.use(authService.protect);

router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword',updateLoggedUserPassword);
router.put('/updateMe',UpdateLoggedUserValidator,updateLoggedUserData);
router.delete('/deleteMe',deleteLoggedUserData);


//Admin
router.use(authService.allowedTo('admin','manager'))
router.put(
      '/changePassword/:id',
      changeUserPasswordValidator,
      changeUserPassword
);
router
.route('/').get(getUsers)
.post(
      uploadUserImage
      ,resizeImage
      ,createUserValidator
      ,createUser
      );
router
.route('/:id')
.get(
      getUserValidator,getUser
)
.put(
      uploadUserImage
      ,resizeImage 
      ,UpdateUserValidator
      ,UpdateUser
)
.delete(
      deleteUserValidator,
      deleteUser);
module.exports= router;
