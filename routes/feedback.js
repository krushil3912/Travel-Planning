var express = require('express');
var router = express.Router();
let feedbackController = require('../controller/feedback')
const multer = require('multer');
const path = require('path');

const fs = require('fs');
const dir = './public/images';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({});

const upload = multer({ storage: storage });
/* GET feedback listing. */

router.post("/create",upload.array('Images', 100),feedbackController.feedbackCreate)
router.get("/find",feedbackController.feedbackFind)
router.patch("/update/:id",feedbackController.feedbackUpdate)



module.exports = router;