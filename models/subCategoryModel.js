const mongoose = require('mongoose');
//create Schema
const subCategorySchema = new mongoose.Schema({
  name:
  {
    type:String,
    trim:true,//تلغي المسافات
    unique:[true,'SubCategory must be unique'],
    minlength:[2,'Too short SubCategory name'],
    maxlength:[32,"Too long SubCategory name"],
  },
  slug:
  {
    type:String,
    lowercase:true,
  },
  category:{
              type: mongoose.Schema.ObjectId,
              ref: 'Category',
              required:[true,'SubCategory must be belong to parent category'],  
            }
},
{timestamps:true}
);
module.exports = mongoose.model('SubCategory',subCategorySchema);