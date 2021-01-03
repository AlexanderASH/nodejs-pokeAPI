const uuid = require('uuid');
const crypto = require('../tools/crypto.js');
const teams = require('../teams/teams.controller');

let usersDataBase = {};

const cleanUpUsers = () => {
    return new Promise((resolve, reject) => {
        usersDataBase = {};
        resolve();
    });
}

const registerUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        let userId = uuid.v4();
        // Guardar en la base de datos de nuestro usuario
        usersDataBase[userId] = {
            userName: userName,
            password: hashedPwd
        };
        await teams.bootstrapTeam(userId);
        resolve();
    });
}

const getUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(usersDataBase[userId]);
    });
}

const getUserIdFromUserName = (userName) => {
    return new Promise((resolve, reject) => {
        for(let user in usersDataBase){
            if(usersDataBase[user].userName == userName){
                let userData = usersDataBase[user];
                userData.userId = user;
                return resolve(userData);
            }
        }
        reject('No user found');
    });
}

const checkUserCredentials = (userName, password) => {
    console.log('Checking user credentials');
    return new Promise(async (resolve, reject) => {
        //Comprobar que las credenciales son correctas
        let user = await getUserIdFromUserName(userName);
        if(user){
            console.log(user);
            crypto.comparePassword(password, user.password, (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        }else{
            reject('Missing user');
        }
    });
}

exports.cleanUpUsers = cleanUpUsers;
exports.registerUser = registerUser;
exports.getUser = getUser;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.checkUserCredentials = checkUserCredentials;