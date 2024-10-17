
const jwt = require("jsonwebtoken") // For JWT token generation
require('dotenv').config();
const bcrypt = require("bcrypt") 

const express = require("express");
const AdminProfileModel  = require("../models/admin-model.js");
const AdminSubjectModel = require("../models/admin-subject.js");
const AdminCategoryModel = require("../models/admin-category.js");
const AdminQuestionModel = require("../models/admin-question.js");
const router = express.Router();

router.post("/admin-register",async (req,res)=>{
 const {email,password}=req.body;
 try {

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = new AdminProfileModel({
       
       email,
       password: hashedPassword, // Save the hashed password
   });

   await newAdmin.save();

   const token = jwt.sign(
       { userId: newAdmin._id, email: newAdmin.email },
       process.env.JWT_SECRET, // Ensure you have JWT_SECRET in your .env file
       { expiresIn: "1h" }
   );

   res.status(200).json({
       message: "Account registered successfully",
       data: {
           email
       },
       token
   });
   
} catch (error) {
   console.error("Error during admin registration:", error);
   res.status(500).json({ error: "admin registration failed!" });
}


})

router.post("/admin-login", async (req, res) => {
  

    try {
        const user = await AdminProfileModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "Incorrect Username/Password" });
        }

        const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCorrect) {
            return res.status(404).json({ message: "Incorrect Username/Password" });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

router.post("/admin/subject",async(req,res)=>{
const {subjects} = req.body;
try {
    const adminsubject = new AdminSubjectModel({
        subject: subjects
    })
    await adminsubject.save();

    res.status(200).json({message:"Successfully Created Subject", adminsubject});

    
} catch (error) {
    console.error("Error during subject create:", error);
    res.status(500).json({ error: "subject create failed!" });
}
})

router.get("/admin/subject", async (req, res) => {
    try {
        const response = await AdminSubjectModel.find({});
        // Send the response along with the success message
        res.status(200).json(response);
    } catch (error) {
        console.error("Error during subject fetching:", error);
        res.status(500).json({ error: "Subject fetching failed!" });
    }
});
router.delete("/admin/subject/:id", async (req, res) => {
    try {
        const response = await AdminSubjectModel.findByIdAndDelete(req.params.id); 
        if (!response) {
            return res.status(404).json({ message: "Subject not found!" }); // Handle case where no subject is found
        }

        // Send the response along with the success message
        res.status(200).json({ message: "Subject deleted successfully!", data: response });
    } catch (error) {
        console.error("Error during subject deletion:", error);
        res.status(500).json({ error: "Subject deletion failed!" });
    }
});


router.post("/admin/category",async(req,res)=>{
    try {
        const {categorys,subjectids} = req.body;
        const admincategory = new AdminCategoryModel({
            categorys: categorys,
            subjectids: subjectids
        })
        await admincategory.save();
    
        res.status(200).json({message:"Successfully Created admincategory"});
    
        
    } catch (error) {
        console.error("Error during admincategory create:", error);
        res.status(500).json({ error: "admincategory create failed!" });
    }
    })
    
    router.get("/admin/category", async (req, res) => {
        try {
            const response = await AdminCategoryModel.find({});
            // Send the response along with the success message
            res.status(200).json(response);
        } catch (error) {
            console.error("Error during admincategory fetching:", error);
            res.status(500).json({ error: "admincategory fetching failed!" });
        }
    });
    router.delete("/admin/category/:id", async (req, res) => {
        try {
            const response = await AdminCategoryModel.findByIdAndDelete(req.params.id); 
            if (!response) {
                return res.status(404).json({ message: "Category not found!" }); // Handle case where no subject is found
            }
    
            // Send the response along with the success message
            res.status(200).json({ message: "Category deleted successfully!", data: response });
        } catch (error) {
            console.error("Error during Category deletion:", error);
            res.status(500).json({ error: "Category deletion failed!" });
        }
    });


    router.post("/admin/question",async(req,res)=>{
        try {
            const { question,
                categoryid,
                option1,
                option2,
                option3,
                option4,
                answer} = req.body;
           
            const adminquestion = new AdminQuestionModel({
                question:question,
                categoryid:categoryid,
                option1:option1,
                option2:option2,
                option3:option3,
                option4:option4,
                answer:answer
            })
            await adminquestion.save();
        
            res.status(200).json({message:"Successfully Created Question"});
        
            
        } catch (error) {
            console.error("Error during Question create:", error);
            res.status(500).json({ error: "Question create failed!" });
        }
        })

        router.get("/admin/question", async (req, res) => {
            try {
                const response = await AdminQuestionModel.find({});
                // Send the response along with the success message
                res.status(200).json(response);
            } catch (error) {
                console.error("Error during question fetching:", error);
                res.status(500).json({ error: "question fetching failed!" });
            }
        });


        router.delete("/admin/question/:id", async (req, res) => {
            try {
                const response = await AdminQuestionModel.findByIdAndDelete(req.params.id); 
                if (!response) {
                    return res.status(404).json({ message: "question not found!" }); // Handle case where no subject is found
                }
        
                // Send the response along with the success message
                res.status(200).json({ message: "question deleted successfully!"});
            } catch (error) {
                console.error("Error during question deletion:", error);
                res.status(500).json({ error: "question deletion failed!" });
            }
        });


module.exports = router;
