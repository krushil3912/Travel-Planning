let ADMIN = require('../model/admin')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

exports.adminSignup = async function (req,res,next) {
    try {
        let findEmail = await ADMIN.findOne({email:req.body.email})
        if (findEmail) {
            throw new Error("Admin Already Exists");
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10)

        let adminData = await ADMIN.create(req.body)

        let token = jwt.sign({id:adminData._id},'SECURE')

        res.status(201).json({
            status : "Success",
            message :"Admin Singup Successfully",
            data : adminData,
            token
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            message : error.message
        })
    }
}

exports.adminLogin = async function (req,res,next) {
    try {

        let adminData = await ADMIN.findOne({email : req.body.email})
        if (!adminData) {
            throw new Error("Admin Not Found");
        }

        let checkPass = bcrypt.compareSync(req.body.password,adminData.password)
        if (!checkPass) {
            throw new Error("Invalid Password");
        }

        res.status(201).json({
            status : "Success",
            message :"Admin Login Successfully",
            data : adminData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail',
            message : error.message
        })
    }
}

exports.adminFindAll = async function (req, res, next) {
    try {
        let adminData = await ADMIN.find()

        if (adminData.length == 0) {
            throw new Error("Admin Data Not Found");
        }
        res.status(200).json({
            status: "Success",
            message: "Admin Find All Data Successfully",
            data: adminData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminFindOne = async function (req, res, next) {
    try {
        let id = req.params.id
        let adminData = await ADMIN.findById(id)

        res.status(200).json({
            status: "Success",
            message: "Admin Fine One Data Successfully",
            data: adminData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminDelete = async function (req, res, next) {
    try {
        let id = req.params.id

        let admin = await ADMIN.findById(id)
        if (!admin) {
            throw new Error("Admin Data Not Found");
        }
        await ADMIN.findByIdAndDelete(id)

        res.status(200).json({
            status: "Success",
            message: "Admin Data Deleted Successfully",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminUpdate = async function (req, res, next) {
    try {
        req.body.password = bcrypt.hashSync(req.body.password,10)
        let id = req.params.id
        let adminData = await ADMIN.findByIdAndUpdate(id,req.body,{new : true})

        res.status(200).json({
            status: "Success",
            message: "Admin Data Update Successfully",
            data: adminData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}