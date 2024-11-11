const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'user', required: true},
    patients: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'patient'
        }
    ]
});
module.exports = mongoose.model('doctor', DoctorSchema);