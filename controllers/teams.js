
const teamsDataBase = {};

const bootstrapTeam = (userId) => {
    teamsDataBase[userId] = [];
};

const getTeamOfUser = (userId) => {
    return teamsDataBase[userId];
};

const addPokemon = (userId, pokemonName) => {
    teamsDataBase[userId].push({
        name: pokemonName
    });
};

const setTeam = (userId, team) => {
    teamsDataBase[userId] = team;
};

exports.bootstrapTeam = bootstrapTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;