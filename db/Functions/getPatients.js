const Patient = require('../models/patient');

//llamar a todos los pacientes
const getPatients = async () => {
    try{
        const patients = await Patient.find().populate('user');
        return patients;
    }catch(error){
        console.log('Error al obtener todos los pacientes:' + error)
    }
}
module.exports = {getPatients}