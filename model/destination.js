let mongoose = require('mongoose')
let Schema = mongoose.Schema

let destinationSchema = new Schema({
    destination:{
       type : [String],
       trim : true,
       required : [true,'Please Enter Destintion']
    }
})

let DESTINATION = mongoose.model('destination',destinationSchema)
module.exports = DESTINATION