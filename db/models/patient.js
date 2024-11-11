const mongoose = require('mongoose');

const PatientSchema = ({
    name: {type:"String", required:true},
    email: {type:"String", required:true, unique:true},
    password: {type:"String", required:true},
    ultrasoundHistory: [{type: mongoose.Schema.Types.ObjectId, ref: 'ultrasound', required: true}] 
});
module.exports = mongoose.model('patient', PatientSchema);