const Doctor = require('../models/doctor');

//crear medico.
const createDoctor = async(data) => {
    try{
        const doctor = new Doctor({data});
        await doctor.save();
        return doctor;
    }catch(error){
        console.log('Error al crear el doctor:'+ error)
    }
}  

module.exports = createDoctor;