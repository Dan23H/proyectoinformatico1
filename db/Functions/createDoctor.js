const User = require('../models/user');
const Doctor = require('../models/doctor');

//crear medico.
const createDoctor = async(data) => {
    try{
        const user = new User(data.user);
        await user.save();
        const doctor = new Doctor({ ...data, user:user._id});
        await doctor.save();
        return doctor;
    }catch(error){
        console.log('Error al crear el doctor:'+ error)
    }
}  

module.exports = createDoctor;