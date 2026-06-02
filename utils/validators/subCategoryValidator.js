const { check,body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
exports.getSubCategoryValidator = [
check('id').isMongoId().withMessage('Invalid SubCategory id'),validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check('name')
    .notEmpty().withMessage('SubCategory required')
    .isLength({ min: 2 }).withMessage('Too short SubCategory name')
    .isLength({ max: 32 }).withMessage('Too long Subcategory name')
    .custom((val,{req})=>
    {
        req.body.slug = slugify(val);
        return true;
    }),
  check('category')
    .notEmpty().withMessage('subCategory must be belong to category')
    .isMongoId().withMessage('Invalid SubCategory id format'),
  validatorMiddleware,
];
exports.UpdateSubCategoryValidator = [
check('id').isMongoId().withMessage('Invalid SubCategory id'),
body('name').custom((val,{req})=>
    {
        req.body.slug = slugify(val);
        return true;
    }),
validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
check('id').isMongoId().withMessage('Invalid SubCategory id'),validatorMiddleware,
];