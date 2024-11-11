const Ultrasound = require('../models/ultrasounds');
const Patient = require('../models/patient');

//crear ultrasonido
const createUltrasound = async(data) => {
    try{
        const ultrasound = new Ultrasound(data);
        await ultrasound.save();
        
        const patient = await Patient.findById(data.patient);
        if (patient){
            patient.ultrasoundHistory.push(ultrasound._id)
            await patient.save();
        }
        return ultrasound;
    }catch(error){
        console.log('Error al crear el ultrasonido:' + error); 
    }
}
module.exports = createUltrasound;