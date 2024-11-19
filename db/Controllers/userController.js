const createPatient = require ('../Functions/createPatient');
const createDoctor = require ('../Functions/createDoctor');
const getLoginInfo = require ('../Functions/LoginQuery');
const getPatients = require ('../Functions/getPatients');
const getDoctors = require ('../Functions/getDoctors')

const newPatient = async (req, res) => {
    try{
        const patient = await createPatient(req.body);
        return res.status(201).json({success: true, data: patient});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
}

const newDoctor = async (req, res, next) => {
    const { name, email, password, identification } = req.body;

    // Verifica que todos los campos requeridos estén presentes
    if (!name || !email || !password || !identification) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        const doctor = await createDoctor({ name, email, password, identification });
        res.status(201).json({ status: 'ok', doctor });
    } catch (error) {
        console.error('Error al crear el doctor:', error.message);
        res.status(500).json({ error: 'Error al crear el doctor.' });
    }
}

const userInfo = async (req, res) => {
    try {
        const { email } = req.body; 
        const user = await getLoginInfo(email);  

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        return res.status(200).json({
            id: user.id,
            name: user.name,
            role: user.role,
            password: user.password,
            identification: user.identification,
            ultrasoundHistory: user.ultrasoundHistory || []  
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

const showPatients = async (req,res) => {
    try{
        const patients = await getPatients();
        return res.status(200).json(patients);
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

const showDoctors = async (req,res) => {
    try{
        const doctors = await getDoctors();
        return res.status(200).json(doctors);
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}


module.exports = {newPatient, newDoctor, userInfo, showPatients, showDoctors}