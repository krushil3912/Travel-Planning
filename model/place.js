let mongoose = require('mongoose')
let Schema = mongoose.Schema

let placeSchema = new Schema({
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'destination',
        required: [true, 'Please Enter Destination Id']
    },
    Images: {
        type: [String],
        required: true
    },
    name: {
        type: String,
        trim: true,
        required:[true,"Please Enter Name"]
    },
    detail:{
        type: String,
        trim: true,
        required: [true,"Please Enter Detail"]
    }
})

let PLACE = mongoose.model('place',placeSchema)
module.exports = PLACE