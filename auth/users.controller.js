const uuid = require('uuid');
const crypto = require('../tools/crypto.js');
const teams = require('../teams/teams.controller');
const mongoose = require('mongoose');
const {to} = require('../tools/to');

const UserModel = mongoose.model('UserModel', 
{ 
    userName: String,
    password: String,
    userId: String
});

const cleanUpUsers = () => {
    return new Promise(async (resolve, reject) => {
        await UserModel.deleteMany({}).exec();
        resolve();
    });
}

const registerUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        let userId = uuid.v4();
        // Guardar en la base de datos de nuestro usuario
        let newUser = new UserModel({
            userId: userId,
            userName: userName,
            password: hashedPwd
        });
        await newUser.save();
        await teams.bootstrapTeam(userId);
        resolve();
    });
}

const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to(UserModel.findOne({
            userId: userId
        }).exec());

        if(err){
            return reject(err);
        }

        resolve(result);
    });
}

const getUserIdFromUserName = (userName) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to(UserModel.findOne({
            userName: userName
        }).exec());

        if(err){
            return reject(err);
        }

        resolve(result);
    });
}

const checkUserCredentials = (userName, password) => {
    console.log('Checking user credentials');
    return new Promise(async (resolve, reject) => {
        //Comprobar que las credenciales son correctas
        let [err, user] = await to(getUserIdFromUserName(userName));
        if(!err || user){
            console.log(user);
            crypto.comparePassword(password, user.password, (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        }else{
            reject(err);
        }
    });
}

exports.cleanUpUsers = cleanUpUsers;
exports.registerUser = registerUser;
exports.getUser = getUser;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.checkUserCredentials = checkUserCredentials;