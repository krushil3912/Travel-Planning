let mongoose = require('mongoose')
let Schema = mongoose.Schema

let bookingSchema = new Schema ({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : [true,"Please Enter UserId"]
    },
    itineraryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'itinerary',
        required : [true,"Please Enter EventId"]
    },
    date : {
        type : String,
        required : [true,"please Enter Date"]
    },
    paymentStatus : {
        type : String,
        enum :['pending..','paid'],
        default : 'pending..'
    }
})

let BOOKING = mongoose.model('booking',bookingSchema)
module.exports = BOOKING