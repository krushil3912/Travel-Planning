let mongoose = require('mongoose')
let Schema = mongoose.Schema

let bookingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, "Please Enter UserId"]
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'destination',
    required: [true, 'Please Enter Destination Id']
  },
  contactNo: {
    type : Number,
    unique : true,
    required : [true, 'Please Enter Phone Number']
  },
  email: {
    type : String,
    trim : true,
    unique : true,
    required : [true, 'Please Enter E-mail']
  },

  bookingDate: {
    type: Date,
    required: [true, 'Please Enter Date'],
    validate: {
      validator: function (value) {
        return value > new Date(); // Ensures the date is in the future
      },
      message: 'Booking date must be in the future!'
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending..', 'paid'],
    default: 'pending..'
  }
});

let BOOKING = mongoose.model('booking', bookingSchema)
module.exports = BOOKING