let mongoose = require('mongoose')
let Schema = mongoose.Schema

let visaSchema = new Schema({
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'destination',
        required: [true, 'Please Enter Destination Id']
    },
    visaDetail: {
        type: String,
        trim : true,
        required: [true, 'Please Enter Visa Detail']
    }
})

let VISA = mongoose.model('visa',visaSchema)
module.exports = VISA