var express = require('express');
var router = express.Router();
let itineraryController = require('../controller/itinerary')
let adminAuth = require('../middelware/adminAuth')

/* GET itinerary page. */
router.post('/create',itineraryController.itineraryCreate)
router.get('/find/',itineraryController.itineraryFindAll)
router.get('/findone/:id',itineraryController.itineraryFindOne)
router.delete('/delete/:id',adminAuth.Auth,itineraryController.itineraryDelete)
router.patch('/update/:id',adminAuth.Auth,itineraryController.itineraryUpdate)

module.exports = router;
