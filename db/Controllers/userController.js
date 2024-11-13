const createPatient = require ('../Functions/createPatient');
const createDoctor = require ('../Functions/createDoctor');
const getLoginInfo = require ('../Functions/LoginQuery');
const getPatients =require ('../Functions/getPatients');

const newPatient = async (req, res) => {
    try{
        const patient = await createPatient(req.body);
        return res.status(201).json({success: true, data: patient});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
}

const newDoctor = async (req, res) => {
    try{
        const doctor = await createDoctor(req.body);
        return res.status(201).json({success: true , data: doctor});
    } catch(error){
        return res.status(500).json({error: error.message});
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

module.exports = {newPatient, newDoctor, userInfo, showPatients}