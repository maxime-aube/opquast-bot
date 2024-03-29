const fs = require('fs');
const CronJobManager = require('cron-job-manager');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.js');
const logger = require('./Class/Logger.js');

// todo => add winston logging
// todo => add i18n
// todo => add introduction message on guildCreate ("hello it's me OpquastBot, I do such and such...")

/* define client, aka the bot */
logger.info('Starting OpquastBot');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

/* attach cron manager to client. Use it in events and commands to manage scheduled publications. */
client.scheduler = new CronJobManager();

/* define bot commands */
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}
logger.info('defined bot commands...');

/* define events */
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}
logger.info('defined bot events...');

/* do the login */
client
    .login(token)
    .then(() => logger.info(`${client.user.tag} Successfully logged into server`))
    .catch(error => logger.error(error))
;
