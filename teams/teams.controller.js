
let teamsDataBase = {};

const cleanUpTeam = () => {
    return new Promise((resolve, reject) => {
        for(let user in teamsDataBase){
            teamsDataBase[user] = [];
        }
        resolve();
    });
};

const bootstrapTeam = (userId) => {
    teamsDataBase[userId] = [];
};

const getTeamOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(teamsDataBase[userId]);
    });
};

const addPokemon = (userId, pokemon) => {
    return new Promise((resolve, reject) => {
        if(teamsDataBase[userId].length == 6){
            reject('Already have 6 pokemon');
        }else{
            teamsDataBase[userId].push(pokemon);
            resolve();
        }
    });
};

const deletePokemonAt = (userId, index) => {
    console.log('DELETE', userId, index);
    if(teamsDataBase[userId][index]){
        teamsDataBase[userId].splice(index, 1);
    }
};

const setTeam = (userId, team) => {
    teamsDataBase[userId] = team;
};

exports.cleanUpTeam = cleanUpTeam;
exports.bootstrapTeam = bootstrapTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.addPokemon = addPokemon;
exports.deletePokemonAt = deletePokemonAt;
exports.setTeam = setTeam;