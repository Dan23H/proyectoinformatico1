const newUltrasound = require ('../Functions/createUltrasound');
const viewHistory = require('../Functions/getHistory');
const Patient = require('../models/patient')

const createUltrasound = async (req, res) => {
    try{
        const ultrasound = await newUltrasound(req.body);
        const patient = await Patient.findById(req.body.patient).populate('ultrasoundHistory');
        return res.status(201).json({success: true, data: ultrasound, patient: patient});
    } catch(error){
        return res.status(500).json({error: error.message})
    }
}

const ultrasoundHistory = async (req, res) => {
    const { patientId } = req.params;  

    try {
        const history = await viewHistory(patientId);
        if (history.length > 0) {
            return res.status(200).json({ success: true, data: history });
        } else {
            return res.status(404).json({ success: false, message: 'No se encontraron ecografías para este paciente.' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {createUltrasound, ultrasoundHistory};