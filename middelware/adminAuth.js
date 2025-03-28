const ADMIN = require('../model/admin');
let jwt = require('jsonwebtoken')

exports.Auth = async function (req,res,next) {
    // console.log('hello');

    try {
        let token = req.headers.authorization
        // console.log(token);
        if (!token) throw new Error("Please Attech Token");

        let tokenVarify = jwt.verify(token,'SECURE')
        // console.log(tokenVarify);
        if(!tokenVarify) throw new Error("Please Enter Valid Token");

        let adminVerify = await ADMIN.findById(tokenVarify.id)
        if (!adminVerify) {
            throw new Error("Admin Not Found");
            
        }
        next()
    } catch (error) {
        res.status(404).json({
            status :"Fail",
            message : error.message
        })
    }
    
}