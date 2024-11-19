const Doctor = require('../models/doctor');

// Crear médico.
const createDoctor = async (data) => {
    try {
        const doctor = new Doctor(data); // Valida automáticamente según el esquema
        return await doctor.save();
    } catch (error) {
        console.error('Error al crear el doctor:', error.message);
        throw error; // Lanza el error para que el controlador lo capture
    }
};

module.exports = createDoctor;
