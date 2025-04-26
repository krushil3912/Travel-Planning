var express = require('express');
var router = express.Router();
let visaController = require('../controller/visa')

/* GET home page. */
router.post('/create',visaController.visaCreate)
router.get('/find',visaController.visaFindAll)
router.patch('/update/:id',visaController.visaUpdate)
router.delete('/delete/:id',visaController.visaDelete)

module.exports = router;
