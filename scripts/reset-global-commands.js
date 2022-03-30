const fs = require("fs");
const {Client, Intents} = require("discord.js");
const {token} = require("../config.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.login(token).then(() => {

    // reset global commands
    client.application.commands.set([]).then(() => {
        console.log(`Successfully reset global commands`);
    })
    .catch(e => {
        console.log(e); // commands reset error
    }).finally(() => {
        client.destroy(); // logout
    });

}).catch(e => {
    console.log(e); // client login error
});
