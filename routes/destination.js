var express = require('express');
var router = express.Router();
let destinationController = require('../controller/destination')
let adminAuth = require('../middelware/adminAuth')
const multer = require('multer');
const path = require('path');

const fs = require('fs');
const dir = './public/images';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({});

const upload = multer({ storage: storage });
/* GET destination page. */
router.post('/create',upload.array('Images', 100),destinationController.destinationcreate)
router.get('/find',destinationController.destinationfindAll)
router.get('/findone/:id',destinationController.destinationfindOne)
router.delete('/delete/:id',adminAuth.Auth,destinationController.destinationDelete)
router.patch('/update/:id',adminAuth.Auth,destinationController.destinationUpdate)

module.exports = router;