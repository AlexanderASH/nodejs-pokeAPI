
let teamsDataBase = {};

const cleanUpTeam = () => {
    for(let user in teamsDataBase){
        teamsDataBase[user] = [];
    }
};

const bootstrapTeam = (userId) => {
    teamsDataBase[userId] = [];
};

const getTeamOfUser = (userId) => {
    return teamsDataBase[userId];
};

const addPokemon = (userId, pokemon) => {
    teamsDataBase[userId].push(pokemon);
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