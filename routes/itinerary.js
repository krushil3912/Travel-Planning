var express = require('express');
var router = express.Router();
let itineraryController = require('../controller/itinerary')
let adminAuth = require('../middelware/adminAuth')

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const dir = './public/images';
// if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, './public/images'),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ storage });

// router.post('/create', upload.array('Images',3) , itineraryController.itineraryCreate)
router.post('/create', itineraryController.itineraryCreate)
router.get('/find/', itineraryController.itineraryFindAll)
router.get('/findone/:id', itineraryController.itineraryFindOne)
router.delete('/delete/:id', adminAuth.Auth, itineraryController.itineraryDelete)
router.patch('/update/:id', adminAuth.Auth, itineraryController.itineraryUpdate)

module.exports = router;
