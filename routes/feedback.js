var express = require('express');
var router = express.Router();
let feedbackController = require('../controller/feedback')

/* GET feedback listing. */

router.post("/create",feedbackController.feedbackCreate)
router.get("/find",feedbackController.feedbackFind)



module.exports = router;