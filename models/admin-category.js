const mongoose = require("mongoose")

const AdminCategorySchema= new mongoose.Schema({
    categorys: {type:String, required:true},
    subjectids: {type:String, required:true}
});

const AdminCategoryModel = mongoose.model('admincategory',AdminCategorySchema)

module.exports =  AdminCategoryModel;