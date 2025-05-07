let mongoose = require('mongoose')
let Schema = mongoose.Schema

let feedbackSchema = new Schema ({
    Images: {
        type: [String],
        required: true
    },
    rating: {
        type: Number, 
        min: 0, 
        max: 5, 
        default: 0,
        required: [true, 'Rating value is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required']
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        required : [true,"Please Enter UserId"],
        ref : "user"
    },
    destinationId:{
        type : mongoose.Schema.Types.ObjectId,
        required : [true,"Please Enter EventId"],
        ref : "destination"
    }
})

let FEEDBACK = mongoose.model('feedback',feedbackSchema)
module.exports = FEEDBACK
