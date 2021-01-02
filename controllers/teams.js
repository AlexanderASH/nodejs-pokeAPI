
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

const setTeam = (userId, team) => {
    teamsDataBase[userId] = team;
};

exports.cleanUpTeam = cleanUpTeam;
exports.bootstrapTeam = bootstrapTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;