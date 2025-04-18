const USER = require('../model/user');
let jwt = require('jsonwebtoken')

exports.Auth = async function (req,res,next) {
    // console.log('hello');

    try {
        let token = req.headers.authorization
        // console.log(token);
        if (!token) throw new Error("Please Attech Token");

        let tokenVarify = jwt.verify(token,process.env.USER_SECURE_KEY)
        // console.log(tokenVarify);
        if(!tokenVarify) throw new Error("Please Enter Valid Token");

        let userVerify = await USER.findById(tokenVarify.id)
        if (!userVerify) {
            throw new Error("User Not Found");
        }
        next()
    } catch (error) {
        res.status(404).json({
            status :"Fail",
            message : error.message
        })
    }
    
}