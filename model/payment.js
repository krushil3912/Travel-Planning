let mongoose = require('mongoose')
let Schema = mongoose.Schema

let paymentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Please Enter User Id"]
    },
    itineraryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itinerary',
        required: [true, "Please Enter Event Id"]
    },
    bookingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'booking',
        required: [true, "Please Enter Event Id"]
    },
    amount: {
        type: String,
        required: [true, 'Please Enter Amount']
    },
    bookNow: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending..', 'paid'],
        default: 'pending..'
    },
    paymentDate: {
        type: Date,
        require:true,
        default: Date.now
    }
})

let PAYMENT = mongoose.model('payment', paymentSchema)
module.exports = PAYMENT