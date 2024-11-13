const Ultrasound = require('../models/ultrasounds');

const viewUltrasound = async (ultrasoundId) => {
    try {
        const ultrasound = await Ultrasound.findById(ultrasoundId)
            .populate('doctor')  
            .populate('patient'); 
        return ultrasound;
    } catch (error) {
        console.log('No se pudo obtener la ecografía:', error);
    }
};

module.exports = viewUltrasound;