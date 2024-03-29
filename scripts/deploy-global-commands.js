/*
    AVOID DEPLOYING GLOBALLY. USE GUILD DEPLOY INSTEAD
 */

const fs = require('fs');
const REST = require('@discordjs/rest');
const Routes = require('discord-api-types/v9');
const { clientId, token } = require('../config.js');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();










