const mongoose = require("mongoose")

const AdminSubjectSchema= new mongoose.Schema({
    subject: {type:String, required:true},
});

const AdminSubjectModel = mongoose.model('adminsubject',AdminSubjectSchema)

module.exports =  AdminSubjectModel;