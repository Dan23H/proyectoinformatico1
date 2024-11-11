const express = require('express');
const router = express.Router();
const ultrasoundController = require('../Controllers/ultrasoundController');

//crear ecografia
router.post('/create-ultrasound', ultrasoundController.createUltrasound);

//ver historial de ecografias
router.get('/ultrasound-history/:patientId', ultrasoundController.ultrasoundHistory)

module.exports = router;