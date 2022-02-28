const fs = require("fs");
const {Client, Intents} = require("discord.js");
const {token} = require("../config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.login(token).then(() => {

    // reset all guilds commands
    client.guilds.cache.forEach(guild => {
        guild.commands.set([]).then(() => {
            console.log(`Successfully reset guild (${guild}) commands`);
        })
        .catch(e => {
            console.log(e); // commands reset error
        }).finally(() => {
            client.destroy(); // logout
        });
    });

}).catch(e => {
    console.log(e); // client login error
});
