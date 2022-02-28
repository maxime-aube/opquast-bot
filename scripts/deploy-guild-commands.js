const fs = require('fs');
const {Client, Intents} = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const { token } = require('../config.json');

const rest = new REST().setToken(token);
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// used to register/update guild commands
async function registerGuildCommands(client, guild) {

    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.push(command.data.toJSON());
    }

    try {
        await rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: commands });
    } catch (error) {
        console.error(error);
    }
}

client.login(token).then(() => {

    console.log(`   Connected (client id = ${client.user.id})`);

    // update all guilds (commands & permissions)
    client.guilds.cache.forEach(guild => {

        // first -> update guild's commands
        registerGuildCommands(client, guild).then(() => {
            console.log(`   Successfully updated guild (${guild}) slash commands.`);
        })
        .catch(e => {
            console.log(e); // command registering error
        });

        // then -> loop through guild's slash commands
        console.log(`   Refreshing guild (${guild.name}) commands.`)
        guild.commands.fetch().then(commands => {

            let role = guild.roles.cache.find(role => role.name === "Opquast-Mod");

            if (!role) {
                console.warn(`   guild (${guild}) >> pas de role Opquast-Mod`);
                // todo => créer le rôle Opquast-Mod dans le guildCreate + notifier échec de mise à jour des permissions
                return;
            }

            console.log(`   guild (${guild}) >> role ${role.name} (${role.id})`);
            let fullPermissions = [];

            commands.forEach(command => {
                if (!command.defaultPermission) {
                    fullPermissions.push({
                        id: command.id,
                        permissions: [{
                            id: role.id,
                            type: 'ROLE',
                            permission: true
                        }]
                    });
                }
            });

            guild.commands.permissions.set({ fullPermissions }).then(fullPermissions => {
                // todo => log applied fullPermissions
                console.log(`   Successfully updated guild (${guild}) command permissions`);
            }).catch(e => {
                console.log(e);
            }).finally(() => {
                client.destroy(); // logout
            });
        });
    });
})
.catch(e => {
    console.log(e) // client connexion error
});
