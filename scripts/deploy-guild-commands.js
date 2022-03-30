const { Client, Intents } = require('discord.js');
const { token } = require('../config.js');
const { CommandDeployer } = require("../Class/CommandDeployer");

/*
    runs with parameter -> example with guild id : npm run deploy-commands -- 912838027062177843
 */

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// fetch guilds with an array of guilds id
function getGuilds(idArr) {
    let guilds = [];
    idArr.forEach(guildId => guilds.push(client.guilds.cache.get(guildId)));
    return guilds;
}

client.login(token).then(() => {

    console.log(`   Connected (client id = ${client.user.id})`);

    // use guilds provided as arguments in command or use guilds.cache
    const guilds = process.argv.slice(2).length > 0 ? getGuilds(process.argv.slice(2)) : client.guilds.cache;

    CommandDeployer.deployCommands(client, guilds, true); // deploy commands
})
.catch(e => {
    console.log(e) // client connexion error
});