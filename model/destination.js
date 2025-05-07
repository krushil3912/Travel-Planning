let mongoose = require('mongoose')
let Schema = mongoose.Schema

let destinationSchema = new Schema({
    Images: {
        type: [String],
        required: true
    },
    destination:{
       type : String,
       trim : true,
       required : [true,'Please Enter Destintion']
    },
    packagePrice:{
            type: String,
            trim: true,
            required :[true,'Please Enter Package Price']
        }
})

let DESTINATION = mongoose.model('destination',destinationSchema)
module.exports = DESTINATION