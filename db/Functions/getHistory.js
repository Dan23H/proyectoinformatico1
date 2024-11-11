const Ultrasound = require('../models/ultrasounds');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

//ver el historial de ultrasonidos de los paicientes
const getUltrasound = async (patientId) => {
    try{
        const ultrasound = await Ultrasound.find({patient: patientId}
            .populate('doctor', 'name')
            .populate('patient','name')
        )
        return ultrasound
    }catch(error){
        console.log ('no se pudo obtener la ecografia: ' + error)
    }
}

module.exports = {getUltrasound};
