const newUltrasound = require ('../Functions/createUltrasound');
const viewHistory = require('../Functions/getHistory');
const viewUltrasound = require('../Functions/viewUltrasound');
const {upload, uploadVideo} = require('../Functions/uploadVideo');
const Patient = require('../models/patient');

const createUltrasound = async (req, res) => {
    try {
        // Usamos el middleware de multer para manejar la subida del archivo
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            // Obtener los datos del cuerpo de la solicitud
            const { patient, doctor, description } = req.body;

            // Subir el video a Azure y obtener la URL con el SAS Token
            const videoUrl = await uploadVideo(req.file.buffer, req.file.originalname);

            // Crear la ecografía con los datos
            const ultrasoundData = {
                patient,
                doctor,
                videoUrl,  
                description,
            };

            // Crear la ecografía en la base de datos
            const ultrasound = await newUltrasound(ultrasoundData);

            // Buscar al paciente y agregar la ecografía a su historial
            const patientRecord = await Patient.findById(patient);
            if (patientRecord) {
                patientRecord.ultrasoundHistory.push(ultrasound._id);  // Agregar ecografía al historial
                await patientRecord.save();
            }

            // Devolver respuesta con la ecografía y la URL accesible
            return res.status(201).json({
                success: true,
                data: ultrasound,
                videoUrl,  // Incluir la URL accesible con SAS Token
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

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

const ultrasoundInfo = async(req,res) => {
    const {ultrasoundId} = req.params;
    try {
        const ultrasound = await viewUltrasound(ultrasoundId);
        if (ultrasound) {
            return res.status(200).json({ success: true, data: ultrasound });
        } else {
            return res.status(404).json({ success: false, message: 'Ecografía no encontrada' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {createUltrasound, ultrasoundHistory, ultrasoundInfo};