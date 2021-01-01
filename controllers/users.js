const uuid = require('uuid');
const crypto = require('../crypto.js');
const teams = require('../controllers/teams');

const usersDataBase = {};

const registerUser = (userName, password) => {
    let hashedPwd = crypto.hashPasswordSync(password);
    let userId = uuid.v4();
    // Guardar en la base de datos de nuestro usuario
    usersDataBase[userId] = {
        userName: userName,
        password: hashedPwd
    };
    teams.bootstrapTeam(userId);
}

const getUser = (userId) => {
    return usersDataBase[userId];
}

const getUserIdFromUserName = (userName) => {
    for(let user in usersDataBase){
        if(usersDataBase[user].userName == userName){
            let userData = usersDataBase[user];
            userData.userId = user;
            return userData;
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
exports.getUser = getUser;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.checkUserCredentials = checkUserCredentials;