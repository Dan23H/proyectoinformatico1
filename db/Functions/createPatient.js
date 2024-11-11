const User = require('../models/user');
const Patient = require('../models/patient');

//crear paciente.
const createPatient = async(data) => {
    try{
        const user = new User(data.user);
        await user.save();
        const patient = new Patient({ ...data, user:user._id});
        await patient.save();
        return patient;
    }catch(error){
        console.log('Error al crear el paciente:'+ error)
    }
};

module.exports = createPatient;
