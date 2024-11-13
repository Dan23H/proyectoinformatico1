const Patient = require('../models/patient');
const Doctor = require('../models/doctor')

//tomar la informacion de login de los usuarios.
const loginQuery = async(email) => {
    try{
        const doctor = await Doctor.findOne({email});
        if(doctor){
            return {
                id:doctor._id, 
                name: doctor.name, 
                password:doctor.password, 
                identification: doctor.identification, 
                role: 'doctor'}
        }

        const patient = await Patient.findOne({email}).populate('ultrasoundHistory');
        if(patient){
            const role = patient.ultrasoundHistory.length > 0 ? 'patient' : 'doctor';
            return {
                id: patient._id, 
                name: patient.name, 
                password: patient.password, 
                identification: patient.identification, 
                role, 
                ultrasoundHistory: 
                patient.ultrasoundHistory}
        }
        }catch(error){
            console.log('error al tomar la informacion:' + error)
    }
}
module.exports = loginQuery;