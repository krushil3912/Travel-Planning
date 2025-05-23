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
        lowercase : true,
        required :[true,"Please Enter Email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please Enter a valid email address']
    },
    password : {
        type : String,
        trim : true,
        required : [true, "Please Enter Password"]
    }
})

let USER = mongoose.model('user',userSchema)
module.exports = USER