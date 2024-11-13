const Patient = require('../models/patient');

//llamar a todos los pacientes
const getPatients = async () => {
    try{
        const patients = await Patient.find().select('name email ultrasoundHistory identification')
        return patients;
    }catch(error){
        console.log('Error al obtener todos los pacientes:' + error)
    }
}
module.exports = getPatients;