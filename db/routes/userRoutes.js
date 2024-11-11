const express = require('express');
const router = express.Router();
const userController = require ('../Controllers/userController');

//crear paciente
router.post('/create-patient', userController.newPatient);

//crear un doctor
router.post('/create-doctor', userController.newDoctor);

//informacion de login
router.post ('/login', userController.userInfo);

//llamar a todos los pacientes
router.get('/patients',userController.showPatients);

module.exports = router;
