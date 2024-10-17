const express = require("express");
const AdminSubjectModel = require("../models/admin-subject.js");
const AdminCategoryModel = require("../models/admin-category");
const AdminQuestionModel = require("../models/admin-question");
const router = express.Router();
require('dotenv').config();

router.get("/student/subject", async (req, res) => {
    try {
        const response = await AdminSubjectModel.find({});
        // Send the response along with the success message
        res.status(200).json(response);
    } catch (error) {
        console.error("Error during subject fetching:", error);
        res.status(500).json({ error: "Subject fetching failed!" });
    }
});

router.get("/student/category", async (req, res) => {
    try {
        const response = await AdminCategoryModel.find({});
        // Send the response along with the success message
        res.status(200).json(response);
    } catch (error) {
        console.error("Error during admincategory fetching:", error);
        res.status(500).json({ error: "admincategory fetching failed!" });
    }
});


router.get("/student/question", async (req, res) => {
    try {
        const response = await AdminQuestionModel.find({});
        // Send the response along with the success message
        res.status(200).json(response);
    } catch (error) {
        console.error("Error during question fetching:", error);
        res.status(500).json({ error: "question fetching failed!" });
    }
});


module.exports = router;