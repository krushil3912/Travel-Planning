var express = require('express');
var router = express.Router();
let itineraryController = require('../controller/itinerary')
let adminAuth = require('../middelware/adminAuth')

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

const upload = multer({ storage: storage });

/* GET itinerary page. */
// router.post('/createData' , (req , res) => {
//     console.log("check route");
    
// })
router.post('/createData', upload.array('Images',3) , itineraryController.itineraryCreate)
router.get('/find/',itineraryController.itineraryFindAll)
router.get('/findone/:id',itineraryController.itineraryFindOne)
router.get('/search',itineraryController.itinerarySearch)
router.delete('/delete/:id',adminAuth.Auth,itineraryController.itineraryDelete)
router.patch('/update/:id',adminAuth.Auth,itineraryController.itineraryUpdate)

module.exports = router;
