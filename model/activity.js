let mongoose = require('mongoose')
let Shcema = mongoose.Schema

let activitySchema = new mongoose.Schema({
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'destination',
        required: true,
    },
    itineraryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itinerary',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    }
})

let ACTIVITY = mongoose.model('activity', activitySchema)
module.exports = ACTIVITY