let ACTIVITY = require('../model/activity')
let DESTINATION = require('../model/destination')

exports.activityCreate = async function (req,res,next) {
    try {
        const {destinationId} = req.body

        let destination = await DESTINATION.findById(destinationId)
        if (!destination) {
            throw new Error("Destination Not Found");
        }

        let existItinerary = await ACTIVITY.findOne({destinationId})
        if (existItinerary) {
         throw new Error("Itinerary Already Exist");
        }


        let activityData = await ACTIVITY.create(req.body)
        res.status(201).json({
            status : "Success",
            message : "Activity Created Successfully",
            data : activityData
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.activityFindAll = async function (req,res,next) {
    try {
        
        let activityData = await ACTIVITY.find().populate('destinationId')

        if (activityData.length == 0) {
            throw new Error("Activity Data Not Exist");
        }
        res.status(200).json({
            status : "Success",
            message : "Find All Activity Successfully",
            data : activityData
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.activityFindOne = async function (req,res,next) {
    try {
        let id = req.params.id
        let activityData = await ACTIVITY.findById(id).populate('destinationId')

        if (!activityData) {
            throw new Error("Activity Data Not Found");
        }
        res.status(200).json({
            status : "Success",
            message : "Find One Activity Successfully",
            data : activityData
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.activityDelete = async function (req,res,next) {
    try {
        let id = req.params.id
        let activityData = await ACTIVITY.findByIdAndDelete(id)
        if (activityData) {
            throw new Error("Activity Data Not Exist");
        }
        res.status(200).json({
            status : "Success",
            message : "Activity Delete Successfully",
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.activityUpdate = async function (req,res,next) {
    try {
        let id = req.params.id
        let activityData = await ACTIVITY.findByIdAndUpdate(id,req.body,{new : true}).populate('destinationId')

        if (!activityData) {
            throw new Error("Activity Not Found");
        }

        res.status(200).json({
            status : "Success",
            message : "Activity Update Successfully",
            data : activityData
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}