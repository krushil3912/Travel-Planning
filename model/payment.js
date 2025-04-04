let mongoose = require('mongoose')
let Schema = mongoose.Schema

let paymentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Please Enter User Id"]
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
    paymentDate: {
        type: Date,
        require:true,
        default: Date.now
    }
})

let PAYMENT = mongoose.model('payment', paymentSchema)
module.exports = PAYMENT