var express = require('express');
var router = express.Router();
let destinationController = require('../controller/destination')
let adminAuth = require('../middelware/adminAuth')

/* GET destination page. */
router.post('/create',destinationController.create)
router.get('/',destinationController.destinationfindAll)
router.get('/:id',destinationController.destinationfindOne)
router.delete('/:id',adminAuth.Auth,destinationController.destinationDelete)
router.patch('/:id',adminAuth.Auth,destinationController.destinationUpdate)

module.exports = router;