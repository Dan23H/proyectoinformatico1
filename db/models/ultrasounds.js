const mongoose = require('mongoose');

const UltrasoundSchema = new mongoose.Schema({
    patient: {type:mongoose.Schema.Types.ObjectId, ref:'patient', required:true},
    doctor: {type:mongoose.Schema.Types.ObjectId, ref:'Doctor', required:true},
    videoUrl: {type:'String', required: true},
    description: {type:'String', required: true},
    date:{type: Date, default: Date.now}
})
module.exports = mongoose.model('ultrasound', UltrasoundSchema)