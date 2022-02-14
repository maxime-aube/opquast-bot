const fs = require("fs");
const {Client, Intents} = require("discord.js");
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const { token } = require('./config.json');

const rest = new REST().setToken(token);
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

client
.login(token)
.then(() => {
    console.log(`Started refreshing guild (/) commands.`);
    client.guilds.cache.forEach(guild => {      //loop through all the guilds
        registerGuildCommands(client, guild).then(() => {
            console.log(`Successfully reloaded guild ${guild} (/) commands.`);
        });
    });
})
.catch(error => {
    console.log(error)
});

async function registerGuildCommands(client, guild) {
    console.log('client: ' + client.user.id);
    try {
        await rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: commands });
    } catch (error) {
        console.error(error);
    }

    //loop through all the slashCommands
    console.log(`Refreshing "${guild.name}" guild's commands.`)
    guild.commands.fetch().then(commands => {
        let role = guild.roles.cache.find(role => role.name === "Opquast");
        const permissions = [
            {
                id: role.id,
                type: 'ROLE',
                permission: true,
            },
        ];
        commands.forEach(command => {
            console.log(`Changing ${guild.name}'s command ${command.name} with role ${role.name}.`);
            //set the permissions for each slashCommand
            // client.application.commands.permissions.set({command: command.id, permissions: [permissions1, permissions2]});
            (async () => {
                await command.permissions.add({ permissions });
            })();
        });
    });
}
