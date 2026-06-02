const mongoose = require('mongoose');
const Product = require('./productModel');
const reviewSchema = new mongoose.Schema(
    {
    title: {
        type: String,
    },
    ratings: {
        type: Number,
        min: [1, 'Min rating value is 1.0'],
        max: [5, 'Max rating value is 5.0'],
        required: [true, 'review ratings required'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to user'],
    },
    product: {
        //parent reference (one to many)
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to product'],
    },
    },
    { timestamps: true }
);

reviewSchema.pre(/^find/, function () {
    this.populate({
    path: 'user',
    select: 'name',
    });
});
reviewSchema.statics.calcAverageRatingsAndQuantity = async function(productId) {
    const result = await this.aggregate([
        { $match: { product: productId } },
        {
            $group: { 
                _id: '$product', // هنا
                avgRatings: { $avg: '$ratings' },
                ratingsQuantity: { $sum: 1 }
            }
        }
    ]);

    if (result.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: result[0].avgRatings,
            ratingsQuantity: result[0].ratingsQuantity,
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: 0,
            ratingsQuantity: 0,
        });
    }
};
reviewSchema.post('save', async function()
{
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
})

reviewSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await doc.constructor.calcAverageRatingsAndQuantity(doc.product);
    }
});
module.exports = mongoose.model('Review', reviewSchema);