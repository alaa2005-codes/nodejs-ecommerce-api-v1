const mongoose = require('mongoose');
const  dbConnection= ()=>{
  mongoose
      .connect(process.env.DB_URI)//يتصل بال DB يعني قاعدة البيانات
      .then((conn) => {//اذا كل شي رجع من قادة البيانات تمام
        console.log(`Database Connected: ${conn.connection.host}`);    
      })
};
module.exports = dbConnection;