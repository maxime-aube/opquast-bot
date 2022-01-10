/* import stuff section... */
const fs = require('fs');
const CronJobManager = require('cron-job-manager');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

/* define client, aka the bot */
console.log('creating bot...');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

/* attach cron manager to client. Use it in events and commands to manage scheduled publications. */
client.scheduler = new CronJobManager();

/* define bot commands */
console.log('defining bot commands...');
client.commands = new Collection();
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
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

/* do the login */
console.log('logging into server...');
client
    .login(token)
    .then(() => console.log(`${client.user.tag} successfully logged into server !`))
    .catch(error => {
        console.log(error)
    })
;
