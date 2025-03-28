var express = require('express');
var router = express.Router();
let activityController = require('../controller/activity')

/* GET home page. */
router.post('/create',activityController.activityCreate)
router.get('/find',activityController.activityFindAll)
router.get('/findOne/:id',activityController.activityFindOne)
router.delete('/delete/:id',activityController.activityDelete)
router.patch('/update/:id',activityController.activityUpdate)

module.exports = router;
