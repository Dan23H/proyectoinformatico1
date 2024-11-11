const newUltrasound = require ('../Functions/createUltrasound');
const viewHistory = require('../Functions/getHistory');

const getUltrasound = async (req, res) => {
    try{
        const ultrasound = await newUltrasound(req.body);
        return res.status(200).json(ultrasound);
    } catch(error){
        return res.status(500).json({error: error.message})
    }
}

const ultrasoundHistory = async (req,res) => {
    const {patientId} = req.params;

    try{
        const history = await viewHistory(patientId);
        return res.status(200).json(history);
    } catch(error){
        return res.status(500).json({error: error.message});
    }
}

module.exports = {getUltrasound, ultrasoundHistory};