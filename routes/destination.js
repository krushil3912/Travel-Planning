var express = require('express');
var router = express.Router();
let destinationController = require('../controller/destination')
let adminAuth = require('../middelware/adminAuth')

/* GET destination page. */
router.post('/create',destinationController.create)
router.get('/find',destinationController.destinationfindAll)
router.get('/findone/:id',destinationController.destinationfindOne)
router.delete('delete/:id',adminAuth.Auth,destinationController.destinationDelete)
router.patch('update/:id',adminAuth.Auth,destinationController.destinationUpdate)

module.exports = router;