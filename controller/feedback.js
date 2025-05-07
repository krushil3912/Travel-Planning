let FEEDBACK = require("../model/feedback")
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.feedbackCreate = async function (req,res,next) {
    try {
        const { rating, comment,userId,destinationId} = req.body;
                let imageUrls = [];
        
                if (!rating || !comment || !userId || !destinationId) {
                    return res.status(400).json({
                        status: 'Fail',
                        message: 'Rating, Comment, UserId andDestinationId are required.'
                    });
                }
        
                if (req.files && req.files.length > 0) {
                    const uploadPromises = req.files.map(async (file) => {
                        const result = await cloudinary.uploader.upload(file.path, { folder: 'feedback' });
                        return result.secure_url;
                    });
        
                    imageUrls = await Promise.all(uploadPromises);
                    // console.log("insert time ==> ",imageUrls);
        
                } else {
                    return res.status(400).json({
                        status: 'Fail',
                        message: 'At least one image is required.'
                    });
                }
        
                const feedbackData = await FEEDBACK.create({
                    rating, 
                    comment,
                    userId,
                    destinationId,
                    Images: imageUrls
                });
        res.status(201).json({
            status : "Success",
            message : "Feedback Create Successfully",
            data : feedbackData
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.feedbackFind = async function (req,res,next) {
    try {
        let feedbackData = await FEEDBACK.find().populate([
            {path: 'userId'},
            {path: 'destinationId'}

        ])
        res.status(201).json({
            status : "Success",
            message : "Feedback Find Successfully",
            data : feedbackData
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.feedbackUpdate = async function (req,res,next) {
    try {
        let id = req.params.id 

        let feedbackData = await FEEDBACK.findByIdAndUpdate(id,req.body,{new : true})
        res.status(201).json({
            status : "Success",
            message : "Feedback Find Successfully",
            data : feedbackData
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}