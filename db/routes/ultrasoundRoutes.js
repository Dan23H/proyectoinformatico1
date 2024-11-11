const express = require('express');
const router = express.Router();
const ultrasoundController = require('../Controllers/ultrasoundController');

//crear ecografia
router.post('/create-ultrasound', ultrasoundController.createUltrasound);

//ver historial de ecografias
router.get('/patient/patient-history', ultrasoundController.ultrasoundHistory)

module.exports = router;