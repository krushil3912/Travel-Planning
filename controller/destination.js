let DESTINATION = require('../model/destination')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
exports.destinationcreate = async function (req, res, next) {
    try {
        const { destination, packagePrice } = req.body;
        let imageUrls = [];

        if (!destination || !packagePrice) {
            return res.status(400).json({
                status: 'Fail',
                message: 'destination and packagePrice are required.'
            });
        }

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'destination' });
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

        const destinationData = await DESTINATION.create({
            destination,
            packagePrice,
            Images: imageUrls
        });
        res.status(201).json({
            status: 'Success',
            message: 'destination Created Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            error: error.message
        })
    }
}

exports.destinationfindAll = async function (req, res, next) {
    try {
        let destinationData = await DESTINATION.find()

        if (destinationData.length == 0) {
            throw new Error("destination Not Found");
        }
        res.status(200).json({
            status: 'Success',
            message: 'destination All Find Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            error: error.message
        })
    }
}

exports.destinationfindOne = async function (req, res, next) {
    try {
        let id = req.params.id
        let destinationData = await DESTINATION.findById(id)
        res.status(200).json({
            status: 'Success',
            message: 'destination One Find Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            error: error.message
        })
    }
}

exports.destinationDelete = async function (req, res, next) {
    try {
        let id = req.params.id

        let destination = await DESTINATION.findById(id)
        if (!destination) {
            throw new Error("destination Already Deleted");
        }

        await DESTINATION.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message: 'destination Delete Successfully',
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            error: error.message
        })
    }
}

exports.destinationUpdate = async function (req, res, next) {
    try {
        let id = req.params.id

        let destinationData = await DESTINATION.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'Success',
            message: 'destination Update Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            error: error.message
        })
    }
}