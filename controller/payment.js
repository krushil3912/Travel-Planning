let nodemailer = require('nodemailer');
let PAYMENT = require('../model/payment');
let BOOKING = require('../model/booking');
let DESTINATION = require('../model/destination')
let USER = require('../model/user');

exports.createPayment = async function (req, res, next) {
    try {
        let user = await USER.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found."
            });
        }
        // let booking = await BOOKING.findById(req.body.bookingId);
        // if (booking) {
        //     return res.status(404).json({
        //         status: "fail",
        //         message: "Your Payment is Already Done."
        //     });
        // }

        const booking = await BOOKING.findById(req.body.bookingId);
        if (!booking) {
            return res.status(404).json({
                status: "fail",
                message: "Booking not found."
            });
        }

        const destination = await DESTINATION.findById(booking.destinationId);

        if (req.body.amount !== destination.packagePrice) {
            return res.status(400).json({
                status: "fail",
                message: `Amount entered (₹${req.body.amount}) does not match the Tour price (₹${destination.packagePrice}).`
            });
        }

        if (!req.body.status) {
            req.body.status = 'pending..';
        }

        if (req.body.bookNow === "" || req.body.bookNow === undefined) {
            req.body.bookNow = false;
        }

        const createdPayment = await PAYMENT.create(req.body);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {
            from: 'dhameliyakrushil2023@gmail.com',
            to: user.email,
            subject: 'Payment Confirmation',
            text: `Dear ${user.firstname} ${user.lastname},\n\nYour payment of ₹${req.body.amount} has been successfully processed.\n\nThank you for your payment!`

        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ', error);
                return res.status(500).json({
                    status: "fail",
                    message: "Payment created, but email could not be sent."
                });
            }
        });

        res.status(201).json({
            status: "success",
            message: "Payment created successfully!",
            createdPayment
        });

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}

exports.viewAllPayments = async function (req, res, next) {
    try {
        const payments = await PAYMENT.find()
            .populate('userId')
            .populate('bookingId')
            .exec();

        if (!payments || payments.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No payments found."
            });
        }

        res.status(200).json({
            status: "success",
            message: "Payments fetched successfully!",
            payments
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.viweOnePayment = async function (req, res, next) {
    try {
        const payment = await PAYMENT.findById(req.params.id)
            .populate('userId')
            .populate('bookingId')
            .exec();

        if (!payment) {
            return res.status(404).json({
                status: "fail",
                message: "Payment not found."
            });
        }

        res.status(200).json({
            status: "success",
            message: "Payment fetched successfully!",
            payment
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.deletePayment = async function (req, res, next) {
    try {
        const payment = await PAYMENT.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                status: "fail",
                message: "Payment not found."
            });
        }

        res.status(200).json({
            status: "success",
            message: "Payment deleted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.updatePayment = async function (req, res, next) {
    try {
        const booking = await BOOKING.findById(req.body.bookingId);
        if (!booking) {
            return res.status(404).json({
                status: "fail",
                message: "Booking not found."
            });
        }
        const destination = await DESTINATION.findById(booking.destinationId);

        if (req.body.amount !== destination.packagePrice) {
            return res.status(400).json({
                status: "fail",
                message: `Amount entered (₹${req.body.amount}) does not match the Tour price (₹${destination.packagePrice}).`
            });
        }
        const payment = await PAYMENT.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                status: "fail",
                message: "Payment not found."
            });
        }

        res.status(200).json({
            status: "success",
            message: "Payment updated successfully!",
            payment
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

