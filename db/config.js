const moongose = require('mongoose');

const connectDB = async() => {
    try{
        moongose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Database Connected')
    } catch(error){
        console.error(error.message);
        throw new Error('error al conectar en la database')
    }
};
module.exports = connectDB;