const TIPS = require('../model/tips');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.tipsCreate = async function (req, res) {
    try {
        const { destinationId, springTemp, summerTemp, autumnTemp, winterTemp, currency, timeDiff, bestTimeToVisit } = req.body;
        let imageUrls = [];

        if (!destinationId || !springTemp || !summerTemp || !autumnTemp || !winterTemp || !currency || !timeDiff || !bestTimeToVisit) {
            return res.status(400).json({
                status: 'Fail',
                message: 'All Detail Are Required.'
            });
        }

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'tips' });
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

        const tipsData = await TIPS.create({
            destinationId,
            springTemp,
            summerTemp,
            autumnTemp, 
            winterTemp, 
            currency, 
            timeDiff, 
            bestTimeToVisit,
            Images: imageUrls
        });

        return res.status(201).json({
            status: 'Success',
            message: 'Tips Detail Created Successfully',
            data: tipsData
        });

    } catch (error) {
        // console.error("Error creating place:", error);
        return res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
};

exports.tipsFindAll = async function (req, res, next) {
    try {

        let tipsData = await TIPS.find().populate('destinationId')

        if (tipsData.length == 0) {
            throw new Error("Tips Data & Detail Not Exist");
        }
        res.status(200).json({
            status: "Success",
            message: "Find All Tips Data & Detail Successfully",
            data: tipsData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.tipsUpdate = async function (req, res) {
    try {
        // console.log(req.body);
        
        const { tipsId } = req.params;
        const { destinationId, springTemp, summerTemp, autumnTemp, winterTemp, currency, timeDiff, bestTimeToVisit } = req.body;
        let imageUrls = [];

        if (!tipsId) {
            return res.status(400).json({
                status: 'Fail',
                message: 'placeId is required.'
            });
        }

        const tips = await TIPS.findById(tipsId);
        if (!tips) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Tips not found.'
            });
        }

        // Handle image upload if new images are provided
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'tips' });
                return result.secure_url;
            });
            imageUrls = await Promise.all(uploadPromises);
        }

        // Update fields
        if (destinationId) tips.destinationId = destinationId;
        if (springTemp) tips.springTemp = springTemp;
        if (summerTemp) tips.summerTemp = summerTemp;
        if (autumnTemp) tips.autumnTemp = autumnTemp;
        if (winterTemp) tips.winterTemp = winterTemp;
        if (currency) tips.currency = currency;
        if (timeDiff) tips.timeDiff = timeDiff;
        if (bestTimeToVisit) tips.bestTimeToVisit = bestTimeToVisit;
        if (imageUrls.length > 0) tips.Images = imageUrls;

        await tips.save();
        const populateTips = await TIPS.findById(tips._id).populate('destinationId');
        return res.status(200).json({
            status: 'Success',
            message: 'Tips Detail Updated Successfully',
            data: populateTips
        });

    } catch (error) {
        // console.error("Error updating place:", error);
        return res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
};

exports.tipsDelete = async function (req, res, next) {
    try {
        let data = await TIPS.findById(req.params.id)
                if (!data) {
                    throw new Error("Tips Data & Detail Not Found");
                }
       await TIPS.findByIdAndDelete(req.params.id)
        
        res.status(200).json({
            status: "Success",
            message: "Tips Data & Detail Delete Successfully"
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}