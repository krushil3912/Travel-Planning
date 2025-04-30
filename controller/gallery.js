const IMAGES = require('../model/gallery');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Create Image Entry with Cloudinary Upload
exports.imagesCreate = async (req, res) => {
    try {
        const { destinationId } = req.body;
        let imageUrls = [];

        if (req.files?.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'gallery' });
                fs.unlinkSync(file.path); // Delete local file after upload
                return result.secure_url;
            });

            imageUrls = await Promise.all(uploadPromises);
        }

        const imageEntry = await IMAGES.create({
            Images: imageUrls,
            destinationId
        });

        res.status(201).json({
            status: 'Success',
            message: 'Images Created Successfully',
            data: imageEntry
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};


// Get All Images
exports.imagesFindAll = async (req, res) => {
    try {
        const images = await IMAGES.find().populate('destinationId');

        if (images.length === 0) {
            return res.status(404).json({ status: 'Fail', message: 'No Images Found' });
        }

        res.status(200).json({
            status: 'Success',
            message: 'All Images Fetched Successfully',
            data: images
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// Get One Image
exports.imagesFindOne = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await IMAGES.findById(id).populate('destinationId');

        if (!image) {
            return res.status(404).json({ status: 'Fail', message: 'Image Not Found' });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Image Fetched Successfully',
            data: image
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// Delete Image
exports.imagesDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await IMAGES.findById(id);

        if (!image) {
            return res.status(404).json({ status: 'Fail', message: 'Image Not Found' });
        }

        await IMAGES.findByIdAndDelete(id);

        res.status(200).json({
            status: 'Success',
            message: 'Image Deleted Successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

// Update Image
exports.imagesUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        let imageUrls = [];
        const gallery = await IMAGES.findById(id);

        // Handle image upload if new images are provided
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'gallery' });
                return result.secure_url;
            });
            imageUrls = await Promise.all(uploadPromises);
        }
        if (imageUrls.length > 0) gallery.Images = imageUrls;

        await gallery.save();
        const populateGallery = await IMAGES.findById(gallery._id).populate('destinationId');

        // const updatedImage = await IMAGES.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('destinationId');

        if (!populateGallery) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Image Not Found'
            });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Image Updated Successfully',
            data: populateGallery
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Fail', message: error.message });
    }
};

