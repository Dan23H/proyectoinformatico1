const User = require('../models/user');

//tomar la informacion de login de los usuarios.
const loginQuery = async(email) => {
    try{
        const user = User.findOne({email}).select('password', 'role');
        return user; 
    }catch(error){
        console.log('Error al traer la informacion:' + error);
    }
}
module.exports = {loginQuery};