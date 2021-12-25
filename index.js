/* import stuff section... */
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

/* define client, aka the bot */
console.log('creating bot...');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
client.commands = new Collection();

/* define bot commands */
console.log('defining bot commands...');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

/* define events */
console.log('defining bot events...');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

/* do the login */
console.log('logging into server...');
client.login(token);


/*  EXEMPLE POUR PROGRAMMER LES PUBLICATIONS RÉGULIÈRES */

/*var cron = require("cron");

function test() {
    console.log("Action executed.");
}

let job1 = new cron.CronJob('01 05 01,13 * * *', test); // fires every day, at 01:05:01 and 13:05:01
let job2 = new cron.CronJob('00 00 08-16 * * 1-5', test); // fires from Monday to Friday, every hour from 8 am to 16

// To make a job start, use job.start()
job1.start();
// If you want to pause your job, use job.stop()
job1.stop();*/
