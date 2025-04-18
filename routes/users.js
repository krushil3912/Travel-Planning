var express = require('express');
var router = express.Router();
let userController = require('../controller/user');
let userAuth = require('../middelware/userAuth')

/* GET users listing. */

router.post('/signup', userController.userSignup)
router.post('/login', userController.userLogin)
router.get('/find', userAuth.Auth,userController.userFindAll)
router.get('/delete/:id',userAuth.Auth,userController.userDelete)
router.patch('/update/:id',userAuth.Auth,userController.userUpdate)

module.exports = router;
