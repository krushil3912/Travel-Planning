let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
    firstname : {
        type : String,
        trim : true,
        required : [true,"Please Enter FirstName"]
    },
    lastname : {
        type : String,
        trim :true,
        required : [true,'please Enter LastName']
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        required :[true,"Please Enter Email"]
    },
    password : {
        type : String,
        trim : true,
        required : [true, "Please Enter Password"]
    }
})

let USER = mongoose.model('user',userSchema)
module.exports = USER