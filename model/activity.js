let mongoose = require('mongoose')
let Shcema = mongoose.Schema

let activitySchema = new mongoose.Schema({
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'destination',
        required: [true, 'Please Enter Destination Id']
    },
    sightseeingIncluded: {
        type: [String],
        required: true,
    },
    packageIncludes: {
        type: [String],
        required: true,
    }
})

let ACTIVITY = mongoose.model('activity', activitySchema)
module.exports = ACTIVITY