var express = require('express');
var router = express.Router();
let bookingController = require('../controller/booking')

/* GET home page. */
router.post('/create',bookingController.bookingCreate)
router.get('/find',bookingController.bookingFindAll)
router.delete('/delete/:id',bookingController.bookingDelete)
router.patch('/update/:id',bookingController.bookingUpdate)

module.exports = router;
