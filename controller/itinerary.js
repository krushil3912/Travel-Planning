let ITINERARY = require('../model/itinerary')
let DESTINATION = require('../model/destination')
// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');
const mongoose = require('mongoose');

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// });

exports.itineraryCreate = async function (req, res, next) {
    try {
        const { destinationId } = req.body;

        // Check Destination Exist or Not
        let destination = await DESTINATION.findById(destinationId)
        if (!destination) {
            throw new Error("Destination Not Found");
        }

        const data = {
            destinationId: new mongoose.Types.ObjectId(destinationId),  // convert to ObjectId
            days: req.body.days,
            packagePrice: req.body.packagePrice,
        }

        // Upload Images to Cloudinary
        // if (req.files && req.files.length > 0) {
        //     const uploadedImages = [];

        //     for (const file of req.files) {
        //         const result = await cloudinary.uploader.upload(file.path, {
        //             folder: 'itinerary_Images'
        //         });
        //         uploadedImages.push(result.secure_url);
        //         fs.unlinkSync(file.path);  // delete local file
        //     }

        //     data.Images = uploadedImages;
        // }

        // Create Itinerary Data
        let itineraryData = await ITINERARY.create(data)

        res.status(201).json({
            status: 'Success',
            message: 'Itinerary Created Successfully',
            data: itineraryData
        })

    } catch (error) {
        // console.log("Error ===>", error);
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.itineraryFindAll = async function (req, res, next) {
    try {

        let itineraryData = await ITINERARY.find().populate('destinationId')

        if (itineraryData.length == 0) {
            throw new Error("Itinerary Data Not Exist");
        }
        res.status(200).json({
            status: 'Success',
            message: 'All Itinerary Find Successfully',
            data: itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.itineraryFindOne = async function (req, res, next) {
    try {
        let id = req.params.id
        let itineraryData = await ITINERARY.findById(id).populate('destinationId')
        res.status(200).json({
            status: 'Success',
            message: 'One Itinerary Find Successfully',
            data: itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.itineraryDelete = async function (req, res, next) {
    try {
        let id = req.params.id

        let itinerary = await ITINERARY.findById(id)
        if (!itinerary) throw new Error("Itinerary Not Found");

        await ITINERARY.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message: 'Itinerary Delete Successfully',

        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.itineraryUpdate = async function (req, res, next) {
    try {
        let id = req.params.id

        let itineraryData = await ITINERARY.findByIdAndUpdate(id, req.body, { new: true }).populate('destinationId')
        res.status(200).json({
            status: 'Success',
            message: 'Itinerary Update Successfully',
            data: itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.itineraryUpdate = async function (req, res, next) {
    try {
        const { destinationId } = req.body;

        // Check Destination Exist or Not
        let destination = await DESTINATION.findById(destinationId)
        if (!destination) {
            throw new Error("Destination Not Found");
        }

        const data = {
            destinationId: newmongoose.Types.ObjectId(destinationId),  // convert to ObjectId
            countryName: req.body.countryName,
            detail: req.body.detail,
            packagePrice: req.body.packagePrice,
        }

        // Upload Images to Cloudinary
        if (req.files && req.files.length > 0) {
            const uploadedImages = [];

            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'itinerary_Images'
                });
                uploadedImages.push(result.secure_url);
                fs.unlinkSync(file.path);  // delete local file
            }

            data.Images = uploadedImages;
        }

        let id = req.params.id

        let itineraryData = await ITINERARY.findByIdAndUpdate(id, req.body, { new: true }).populate('destinationId')
        res.status(200).json({
            status: 'Success',
            message: 'Itinerary Update Successfully',
            data: itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}


exports.itinerarySearch = async function (req, res, next) {
    try {
        let searchQuery = req.query.q?.trim(); // Extract query parameter
        let itineraryData;

        if (searchQuery) {
            itineraryData = await ITINERARY.find({
                $or: [
                    { countryName: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search
                ]
            });
        } else {
            itineraryData = await ITINERARY.find();
        }

        res.status(200).json({
            status: "Success",
            message: "Your Eevnt was found successfully",
            data: itineraryData
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
}