let mongoose = require('mongoose')
let Schema = mongoose.Schema

let destinationSchema = new Schema({
    subdestination:{
       type : String,
       enum : ['InIndia','Europ Country','Asian Country'],
       required : [true,'InIndia, Europ Country, Asian Country']
    },
  
})

let DESTINATION = mongoose.model('destination',destinationSchema)
module.exports = DESTINATION