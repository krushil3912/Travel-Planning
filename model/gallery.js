let mongoose = require('mongoose')
let Schema = mongoose.Schema

const imagesSchema = new Schema({
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'destination',
        required: [true, 'Please Enter Destination Id']
    },
    Images: {
        type: [String],
        required: true
    }
});


let IMAGES = mongoose.model('gallery', imagesSchema)
module.exports = IMAGES