const Ultrasound = require('../models/ultrasounds');

//ver el historial de ultrasonidos de los paicientes
const getUltrasoundHistory = async (patientId) => {
    try {
        const ultrasoundHistory = await Ultrasound.find({ patient: patientId })
            .populate('doctor')
            .populate('patient')
        return ultrasoundHistory;
    } catch (error) {
        console.log('No se pudo obtener el historial de ecografías:', error);
    }
};

module.exports = getUltrasoundHistory;
