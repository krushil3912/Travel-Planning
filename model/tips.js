let mongoose = require('mongoose')
let Schema = mongoose.Schema

let tipsSchema = new Schema({
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'destination',
        required: [true, 'Please Enter Destination Id']
    },
    springTemp: {
        type: String,
        trim : true,
        required: true
    },
    summerTemp: {
        type: String,
        trim : true,
        required: true
    },
    autumnTemp: {
        type: String,
        trim : true,
        required: true
    },
    winterTemp: {
        type: String,
        trim : true,
        required: true
    },
    currency: {
        type: String,
        trim : true,
        required: true
    },
    timeDiff: {
        type: String,
        trim : true,
        required: true
    },
    bestTimeToVisit: {
        type: String,
        trim : true,
        required: true
    },
    Images: {
        type: [String],
        required: true
    }
})

let TIPS = mongoose.model('tips',tipsSchema)
module.exports = TIPS