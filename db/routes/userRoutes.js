const express = require('express');
const router = express.Router();
const {newPatient,newDoctor,userInfo,showPatients} = require ('../Controllers/userController');

//crear paciente
router.post('/create-patient', newPatient);

//crear un doctor
router.post('/create-doctor', newDoctor);

//informacion de login
router.post ('/login', userInfo);

//llamar a todos los pacientes
router.get('/patients', showPatients);

module.exports = router;
