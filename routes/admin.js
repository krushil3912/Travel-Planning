var express = require('express');
var router = express.Router();
let adminController = require('../controller/admin')
let adminAuth = require('../middelware/adminAuth')


/* GET Admin page. */
router.post('/singup', adminController.adminSignup)
router.post('/login', adminController.adminLogin)
router.get('/find', adminController.adminFindAll)
router.get('/findone/:id',adminController.adminFindOne)
router.delete('/delete/:id',adminAuth.Auth, adminController.adminDelete)
router.patch('/update/:id',adminAuth.Auth, adminController.adminUpdate)

module.exports = router;
