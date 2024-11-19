const Doctor = require('../models/doctor');

//llamar a todos los doctores
const getDoctors = async () => {
    try {
        const doctors = await Doctor.find().select('-password');
        return doctors;
    } catch (error) {
        console.error('Error al obtener los doctores:', error.message);
        throw error;
    }
};

module.exports = getDoctors;
