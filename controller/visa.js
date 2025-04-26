let VISA = require('../model/visa')
let DESTINATION = require('../model/destination')

exports.visaCreate = async function (req, res, next) {
    try {
        const { destinationId } = req.body

        let destination = await DESTINATION.findById(destinationId)
        if (!destination) {
            throw new Error("Destination Not Found");
        }

        // Check Visa Detail is Already Exist
        let existVisa = await VISA.findOne({destinationId})
        if(existVisa){
            throw new Error("Visa detail Is Already Exist");
        }

        let visaData = await VISA.create(req.body)
        res.status(201).json({
            status: 'Success',
            message: "Visa Detail Create Successfully",
            data: visaData
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.visaFindAll = async function (req, res, next) {
    try {
        let visaData = await VISA.find().populate('destinationId')

        if (visaData.length == 0) {
            throw new Error("Visa Detail Not Found");
        }

        res.status(201).json({
            status: 'Success',
            message: "Visa Detail Create Successfully",
            data: visaData
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.visaUpdate = async function (req,res,next) {
    try {
        let id = req.params.id
        let visaData = await VISA.findByIdAndUpdate(id,req.body,{new : true}).populate('destinationId')

        res.status(200).json({
            status : "Success",
            message : "Activity Update Successfully",
            data : visaData
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.visaDelete = async function (req,res,next) {
    try {
        let id = req.params.id
        let visaData = await VISA.findByIdAndDelete(id)
        if (!visaData) {
            throw new Error("Visa Detail Not Found");
        }
        
        res.status(200).json({
            status : "Success",
            message : "Visa Detail Delete Successfully",
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}