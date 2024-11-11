const mongoose = require('mongoose');

const PatientSchema = ({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    ultrasound: [{type: mongoose.Schema.Types.ObjectId, ref: 'ultrasound', required: true}]
});
module.exports = mongoose.model('patient', PatientSchema);