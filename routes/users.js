var express = require('express');
var router = express.Router();
let userController = require('../controller/user');
let adminAuth = require('../middelware/adminAuth')

/* GET users listing. */

router.post('/signup', userController.userSignup)
router.post('/login', userController.userLogin)
router.get('/find', userController.userFindAll)
router.get('/delete/:id',adminAuth.Auth,userController.userDelete)
router.patch('/update/:id',adminAuth.Auth,userController.userUpdate)

module.exports = router;
