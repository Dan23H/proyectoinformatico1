const Ultrasound = require('../models/ultrasounds');

//crear ultrasonido
const createUltrasound = async(data) => {
    try{
        const ultrasound = new Ultrasound(data);
        await ultrasound.save();
        return ultrasound;
    }catch(error){
        console.log('Error al crear el ultrasonido:' + error); 
    }
}
module.exports = {createUltrasound};