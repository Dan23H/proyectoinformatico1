const Ultrasound = require('../models/ultrasounds');

//ver el historial de ultrasonidos de los paicientes
const getUltrasoundHistory = async (patientId) => {
    try{
        const ultrasound = await Ultrasound.find({patient: patientId}
            .populate('doctor')
            .populate('patient')
        )
        return ultrasound
    }catch(error){
        console.log ('no se pudo obtener la ecografia: ' + error)
    }
}

module.exports = getUltrasoundHistory;
