const mongoose = require('mongoose');
// 1- Create Schema
const categorySchema = new mongoose.Schema({
  name:
  {
    type:String,
    required:[true,'Category required'],
    unique:[true,'Category must be unique'],
    minlength:[3,'Too short category name'],
    maxlength:[32,"Too long category name"],
  },
  slug:
  {
    type:String,
    //يعني اي حروف لح تتخزن لح تتحول لحروف صغيرة ان كانت كبيرة وكل شي فراغ يصير -
    lowercase:true,
  },
  image:String,
},
{timestamps:true}//لح تساوي شغلتين وهنن تاريخ تاريخ ووقت آخر تعديل صار على العنصر.وقت إنشاء العنصر لأول مرة 2 تاريخ ووقت آخر تعديل صار على العنصر.
);

const setImageURL = (doc)=>
{
  if(doc.image)
  {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl; 
  }
}
// findOne,findAll and update
categorySchema.post('init', function(doc) 
{
    setImageURL(doc); 
});
//create
categorySchema.post('save', function(doc) {
    setImageURL(doc);
});
// 2- Create Model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;