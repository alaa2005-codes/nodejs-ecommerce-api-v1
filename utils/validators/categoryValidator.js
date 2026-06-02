const {check,body} = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
exports.getCategoryValidator = [
check('id').isMongoId().withMessage('Invalid category id'),validatorMiddleware,
];
exports.createCategoryValidator = [
    check('name').notEmpty()
    .withMessage('Category required')
    .isLength({min:3})
    .withMessage('Too short Category name')
    .isLength({max:32})
    .withMessage('Too long category name')
    .custom((val,{req})=>
    {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware,
]
exports.UpdateCategoryValidator = [
check('id').isMongoId().withMessage('Invalid category id'),
body('name')
.optional()
.custom((val,{req})=>
    {
        req.body.slug = slugify(val);
        return true;
    }),
validatorMiddleware,
];

exports.deleteCategoryValidator = [
check('id').isMongoId().withMessage('Invalid category id'),validatorMiddleware,
];