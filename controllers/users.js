const uuid = require('uuid');
const crypto = require('../crypto.js');

const usersDataBase = {};

const registerUser = (userName, password) => {
    let hashedPwd = crypto.hashPasswordSync(password);
    // Guardar en la base de datos de nuestro usuario
    usersDataBase[(uuid.v4())] = {
        userName: userName,
        password: hashedPwd
    };
}

const getUserIdFromUserName = (userName) => {
    for(let user in usersDataBase){
        if(usersDataBase[user].userName == userName){
            return usersDataBase[user];
        }
    }
}

const checkUserCredentials = (userName, password, done) => {
    console.log('Checking user credentials');
    //Comprobar que las credenciales son correctas
    let user = getUserIdFromUserName(userName);
    if(user){
        console.log(user);
        crypto.comparePassword(password, user.password, done);
    }else{
        done('Missing user');
    }
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;