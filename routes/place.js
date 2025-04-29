var express = require('express');
var router = express.Router();
let placeController = require('../controller/place')
const multer = require('multer');
const path = require('path');

const fs = require('fs');
const dir = './public/images';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({});

const upload = multer({ storage: storage });
router.post('/create', upload.array('Images', 100), placeController.placeCreate)
router.get('/find', placeController.placeFindAll)
// router.patch('/update/:id', placeController.placeUpdate)
router.patch('/update/:placeId', upload.array('Images', 100), placeController.placeUpdate)
router.delete('/delete/:id',placeController.placeDelete)

module.exports = router;
