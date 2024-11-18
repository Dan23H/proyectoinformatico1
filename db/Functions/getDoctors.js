const Doctor = require('../models/doctor');

//llamar a todos los doctores
const getDoctors = async () => {
    try{
        const doctors = await Doctor.find().select('name email identification')
        return doctors;
    }catch(error){
        console.log('Error al obtener todos los doctores:' + error)
    }
}
module.exports = getDoctors;