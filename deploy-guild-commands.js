const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guilds, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST().setToken(token);

(async () => {
    console.log(`Started refreshing guild (/) commands.`);
    for (const guild in guilds) {
        try {
            await rest.put(Routes.applicationGuildCommands(clientId, guilds[guild]), { body: commands });
            console.log(`Successfully reloaded guild ${guild} (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    }
})();

