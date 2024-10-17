const mongoose = require("mongoose")

const AdminQuestionSchema= new mongoose.Schema({
    question: {type:String, required:true},
    categoryid: {type:String, required:true},
    option1: {type:String, required:true},
    option2: {type:String, required:true},
    option3: {type:String, required:true},
    option4: {type:String, required:true},
    answer: {type:String, required:true},
});

const AdminQuestionModel = mongoose.model('adminquestion',AdminQuestionSchema)

module.exports =  AdminQuestionModel;