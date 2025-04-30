var express = require('express');
var router = express.Router();
let paymentController = require('../controller/payment')

/* GET payment listing. */

router.post('/create',paymentController.createPayment)
router.get('/find',paymentController.viewAllPayments)
router.get('/findone/:id', paymentController.viweOnePayment);
router.delete('/delete/:id', paymentController.deletePayment);
router.patch('/update/:id', paymentController.updatePayment);


module.exports = router;
