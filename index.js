/* import stuff section... */
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

/* define client, aka the bot */
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

/* define bot commands */
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

/* events */

client.once('ready', () => {
    console.log('ready to Opquast!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'opquast') {
        await interaction.reply();
    } else if (commandName === 'server') {
        await interaction.reply(` Serveur de dev '${interaction.guild.name}'\ncréé le ${interaction.guild.createdAt.toLocaleDateString('fr-FR')}\nQuoi d'autre ?`);
    } else if (commandName === 'user') {
        await interaction.reply(`ton tag: ${interaction.user.tag}\nton id: ${interaction.user.id}\nde rien`);
    }
});

/* do the login */
client.login(token);
