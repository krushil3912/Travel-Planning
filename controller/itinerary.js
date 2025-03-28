let ITINERARY = require('../model/itinerary')
let DESTINATION = require('../model/destination')

exports.itineraryCreate = async function (req,res,next) {
    try {
        const { destinationId} = req.body

        let destination = await DESTINATION.findById(destinationId)
        if (!destination) {
            throw new Error("Destination Not Found");
        }

        let existDestination = await ITINERARY.findOne({destinationId})
        if (existDestination) {
            throw new Error("Destination Already Exist");
        }

        let itineraryData = await ITINERARY.create(req.body)
        res.status(201).json({
            status : 'Success',
            message : 'Itinerary Create Successfully',
            data : itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            message : error.message
        })
    }
}

exports.itineraryFindAll = async function (req,res,next) { 
    try {

        let itineraryData = await ITINERARY.find().populate('destinationId')

        if (itineraryData.length == 0) {
            throw new Error("Itinerary Data Not Exist");
        }
        res.status(200).json({
            status : 'Success',
            message : 'All Itinerary Find Successfully',
            data : itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            message : error.message
        })
    }
}

exports.itineraryFindOne = async function (req,res,next) {
    try {
        let id = req.params.id
        let itineraryData = await ITINERARY.findById(id).populate('destinationId')
        res.status(200).json({
            status : 'Success',
            message : 'One Itinerary Find Successfully',
            data : itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            message : error.message
        })
    }
}

exports.itineraryDelete = async function (req,res,next) {
    try {
        let id = req.params.id

        let itinerary = await ITINERARY.findById(id)
        if(!itinerary) throw new Error("Itinerary Not Found");
        
        await ITINERARY.findByIdAndDelete(id)
        res.status(200).json({
            status : 'Success',
            message : 'Itinerary Delete Successfully',
            
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            message : error.message
        })
    }
}

exports.itineraryUpdate = async function (req,res,next) {
    try {
        let id = req.params.id
        
        let itineraryData = await ITINERARY.findByIdAndUpdate(id,req.body,{new : true }).populate('destinationId')
        res.status(200).json({
            status : 'Success',
            message : 'Itinerary Update Successfully',
            data : itineraryData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            message : error.message
        })
    }
}