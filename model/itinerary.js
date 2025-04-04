let mongoose = require('mongoose')
let Schema = mongoose.Schema

let itinerarySchema = new Schema ({
    destinationId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'destination',
        required: [true,'Please Enter Destination Id']
    },
    countryName:{
        type: String,
        trim : true,
        required :[true,'Please Enter countryName']
    },
    detail:{
        type: String,
        trim : true,
        required :[true,'Please Enter Detail Of Place']
    },
    Images: {
        type: [String],
        require: true
    },
    packagePrice:{
        type: String,
        trim: true,
        required :[true,'Please Enter Package Price']
    }
})

let ITINERARY = mongoose.model('itinerary',itinerarySchema)
module.exports = ITINERARY