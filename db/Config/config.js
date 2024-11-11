const moongose = require('mongoose');
const dbConnection = process.env.DB_CONNECTION;

const connectDB = async() => {
    try{
        await moongose.connect(dbConnection, {userNewUrlParser: true, useUnifiedTopology: true})
        console.log('Database Connected')
    } catch(error){
        console.error(error.message);
        process.exit(1);
    }
};
module.exports = {connectDB};