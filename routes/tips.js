var express = require('express');
var router = express.Router();
let tipsController = require('../controller/tips')
const multer = require('multer');
const path = require('path');

const fs = require('fs');
const dir = './public/images';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({});

const upload = multer({ storage: storage });

router.post('/create',upload.array('Images', 100),tipsController.tipsCreate)
router.get('/find',tipsController.tipsFindAll)
router.patch('/update/:tipsId', upload.array('Images', 100),tipsController.tipsUpdate)
router.delete('/delete/:id',tipsController.tipsDelete)

module.exports = router;
