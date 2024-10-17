const mongoose = require("mongoose")

const AdminProfileSchema= new mongoose.Schema({
    email: {type:String, required:true},
    password:{type:String,required:true},
});

const AdminProfileModel = mongoose.model('adminprofile',AdminProfileSchema)

module.exports =  AdminProfileModel;