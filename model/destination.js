let mongoose = require('mongoose')
let Schema = mongoose.Schema

let destinationSchema = new Schema({
    subdestination:{
        inIndia:{
            type : [String]
        },
        asiaCountries:{
            type : [String]
        },
        europeCountries:{
            type : [String]
        }
    },
  
})

let DESTINATION = mongoose.model('destination',destinationSchema)
module.exports = DESTINATION