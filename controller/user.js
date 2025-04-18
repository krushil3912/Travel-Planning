let bcrypt = require('bcrypt')
let USER = require('../model/user')
let jwt = require('jsonwebtoken')

exports.userSignup = async function (req, res, next) {
    try {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const { email, password } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "fail",
                message: "Please enter a valid Gmail address (must end with @gmail.com)."
            });
        }

        let findEmail = await USER.findOne({ email: req.body.email })
        if (findEmail) {
            throw new Error("User Already Exists");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: "fail",
                message: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = await USER.create({ ...req.body, password: hashedPassword });
        // console.log(userData);

        let token = jwt.sign({id:userData._id},process.env.USER_SECURE_KEY)

        res.status(201).json({
            status: "Success",
            message: "User Signup Successfully",
            data: userData,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.userLogin = async function (req, res, next) {
    try {
        let userData = await USER.findOne({ email: req.body.email })
        if (!userData) {
            throw new Error("User Not Found");
        }

        let checkPass = req.body.password = bcrypt.compareSync(req.body.password, userData.password)
        if (!checkPass) {
            throw new Error("Invalid Password");
        }

        res.status(200).json({
            status: "Success",
            message: "User Login Successfully",
            data: userData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.userFindAll = async function (req, res, next) {
    try {
        let userData = await USER.find()

        if (userData.length == 0) {
            throw new Error("User Data Not Found");
        }

        res.status(200).json({
            status: "Success",
            message: "User Find All Data Successfully",
            data: userData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.userFindOne = async function (req, res, next) {
    try {
        let id = req.params.id
        let userData = await USER.findById(id)

        res.status(200).json({
            status: "Success",
            message: "User Fine One Data Successfully",
            data: userData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.userDelete = async function (req, res, next) {
    try {
        let id = req.params.id

        let user = await USER.findById(id)
        if (!user) {
            throw new Error("User Data Already Deleted");
        }
        await USER.findByIdAndDelete(id)

        res.status(200).json({
            status: "Success",
            message: "User Data Deleted Successfully",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.userUpdate = async function (req, res, next) {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        let id = req.params.id
        let updatedUser = await USER.findByIdAndUpdate(id,req.body,{new: true })

        res.status(200).json({
            status: "Success",
            message: "User Data Update Successfully",
            data: updatedUser
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}