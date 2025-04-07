let ITINERARY = require('../model/itinerary')
let DESTINATION = require('../model/destination')

exports.itineraryCreate = async function (req, res, next) {

    // console.log("check function");
    
    try {
        const { destinationId } = req.body

        // console.log("destinationId ==> ",destinationId);
        

        let destination = await DESTINATION.findById(destinationId)
        if (!destination) {
            throw new Error("Destination Not Found");
        }

        const data = req.body
        
        if (req.files && req.files.length > 0) {
            const fileNames = req.files.map(file => file.filename);
            data.Images = fileNames;
        }
        console.log(data);
        
        let itineraryData = await ITINERARY.create(req.body)
        console.log(itineraryData);
        
        res.status(201).json({
            status: 'Success',
            message: 'Itinerary Create Successfully',
            data: itineraryData
        })
    } catch (error) {
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