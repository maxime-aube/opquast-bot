const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

const token = 'OTEyNzkyMDc5NDg1MjQ3NTU5.YZ1F3g.ssUkEcYq-tMh9sVHUgwdDjRxjT8';
const commands = [{
    name: 'opquast',
    description: 'Replies with Pong!'
}];

bot.login(token);