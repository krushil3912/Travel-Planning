let FEEDBACK = require("../model/feedback")

exports.feedbackCreate = async function (req,res,next) {
    try {
        let feedbackData = await FEEDBACK.create(req.body)
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
            {path: 'itineraryId'},
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