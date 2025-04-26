const PLACE = require('../model/place');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.placeCreate = async function (req, res) {
    try {
        const { destinationId, name, detail } = req.body;
        let imageUrls = [];

        if (!destinationId || !name || !detail) {
            return res.status(400).json({
                status: 'Fail',
                message: 'destinationId, name, and detail are required.'
            });
        }

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'place' });
                fs.unlinkSync(file.path); // Delete local file after upload
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

        const placeData = await PLACE.create({
            destinationId,
            name,
            detail,
            Images: imageUrls
        });

        return res.status(201).json({
            status: 'Success',
            message: 'Place Detail Created Successfully',
            data: placeData
        });

    } catch (error) {
        console.error("Error creating place:", error);
        return res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
};

exports.placeFindAll = async function (req, res, next) {
    try {

        let placeData = await PLACE.find().populate('destinationId')

        if (placeData.length == 0) {
            throw new Error("Place Data & Detail Not Exist");
        }
        res.status(200).json({
            status: "Success",
            message: "Find All Place Data & Detail Successfully",
            data: placeData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.placeUpdate = async (req, res) => {
    try {
        const { destinationId } = req.body;
        console.log(req.body);
        
        let imageUrls = [];

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'place' });
                fs.unlinkSync(file.path); // Delete local file after upload
                return result.secure_url;
            });

            imageUrls = await Promise.all(uploadPromises);
            console.log("insert time ==> ",imageUrls);          

        }

        const placeData = await PLACE.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            destinationId,
            Images: imageUrls
        }).populate('destinationId');

        if (!placeData) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Image Not Found'
            });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Image Updated Successfully',
            data: placeData
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
};