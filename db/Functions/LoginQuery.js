const Patient = require('../models/patient');
const Doctor = require('../models/doctor')

//tomar la informacion de login de los usuarios.
const loginQuery = async(email) => {
    try{
        const doctor = await Doctor.findOne({email});
        if(doctor){
            return {password:doctor.password, role: 'doctor'}
        }

        const patient = await Patient.findOne({email});
        if(patient){
            const role = patient.ultrasoundHistory.length > 0 ? 'patient' : 'doctor';
            return {password: patient.password, role}
        }
        }catch(error){
            console.log('error al tomar la informacion:' + error)
    }
}
module.exports = loginQuery;