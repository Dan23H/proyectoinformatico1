const Patient = require('../models/patient');

//crear paciente.
const createPatient = async(data) => {
    try{
        const patient = new Patient(data);
        await patient.save();
        return patient;
    }catch(error){
        console.log('Error al crear el paciente:'+ error)
    }
};

module.exports = createPatient;
