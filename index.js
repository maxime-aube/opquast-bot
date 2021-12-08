const { Client, Intents } = require('discord.js');
const auth = require('./auth.json');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands = [{
    name: 'opquast',
    description: 'Affiche une règle Opquast'
}];

bot.login(auth.token);