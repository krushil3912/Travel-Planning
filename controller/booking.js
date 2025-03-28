let BOOKING = require('../model/booking');
let USER = require('../model/user')

exports.bookingCreate = async function (req, res, next) {
    try {
        const {userId} = req.body
        let user = await BOOKING.findOne({userId: userId})
        if (user) {
            throw new Error("This User Can Already Booked The Tour");       
        }

        let bookingData = await BOOKING.create(req.body);
        res.status(201).json({
            status: 'Success',
            message: 'Your booking was successful',
            data: bookingData
        });
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
}

exports.bookingFindAll = async function (req, res, next) {
    try {

        let bookingData = await BOOKING.find().populate([
            { path: 'userId' },
            { path: 'itineraryId' }
        ])

        res.status(200).json({
            status: 'Success',
            message: 'All Booking Find Successful',
            data: bookingData
        });
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
}

exports.bookingDelete = async function (req, res, next) {
    try {

        let id = req.params.id
        let checkCancel = await BOOKING.findById(id)
        if (!checkCancel) {
            throw new Error("Your Booking Already Cancelled");
        }
        await BOOKING.findByIdAndDelete(id)

        res.status(200).json({
            status: 'Success',
            message: 'Your Booking Cancel Successfully',
        });
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
}

exports.bookingUpdate = async function (req, res, next) {
    try {

        let id = req.params.id
        let bookingData = await BOOKING.findByIdAndUpdate(id,req,body,{new : true})

        bookingData = await BOOKING.find().populate([
            { path: 'userId' },
            { path: 'eventId' }
        ])

        res.status(200).json({
            status: 'Success',
            message: 'Your Booking Update Successfully',
            data : bookingData
        });
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: error.message
        });
    }
}

exports.bookingSearch = async function (req, res, next) {
    try {
        let searchQuery = req.query.q; // Extract query parameter
        let bookingData;

        if (searchQuery) {
            bookingData = await BOOKING.find({
                $or: [
                    { date: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search
                ]
            });
        } else {
            bookingData = await BOOKING.find();
        }

        res.status(200).json({
            status: "Success",
            message: "Your Eevnt was found successfully",
            data: bookingData
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
}