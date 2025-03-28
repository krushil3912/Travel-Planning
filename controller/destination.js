let DESTINATION = require('../model/destination')

exports.create = async function (req,res,next) {
    try {
    
        let destinationData = await DESTINATION.create(req.body)
        res.status(201).json({
            status: 'Success',
            message : 'destination Created Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            error: error.message
        })
    }
}

exports.destinationfindAll = async function (req,res,next) {
    try {
        let destinationData = await DESTINATION.find()

        if (destinationData.length == 0) {
            throw new Error("destination Not Found");
        }
        res.status(200).json({
            status: 'Success',
            message : 'destination All Find Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            error: error.message
        })
    }
}

exports.destinationfindOne = async function (req,res,next) {
    try {
        let id = req.params.id 
        let destinationData = await DESTINATION.findById(id)
        res.status(200).json({
            status: 'Success',
            message : 'destination One Find Successfully',
            data: destinationData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            error: error.message
        })
    }
}

exports.destinationDelete = async function (req,res,next) {
    try {
        let id = req.params.id 

        let destination = await DESTINATION.findById(id)
        if (!destination) {
            throw new Error("destination Already Deleted");
        }

        await DESTINATION.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message : 'destination Delete Successfully',
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            error: error.message
        })
    }
}

exports.destinationUpdate = async function (req,res,next) {
    try {
        let id = req.params.id 

        let destinationData = await DESTINATION.findByIdAndUpdate(id,req.body,{new : true})
        res.status(200).json({
            status: 'Success',  
            message : 'destination Update Successfully',
            data : destinationData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            error: error.message
        })
    }
}