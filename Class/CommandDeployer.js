const fs = require('fs');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const { token } = require('../config.json');

class CommandDeployer {

    /**
     * @Comment deploy one or more guild commands with permissions
     * @param client
     * @param guilds
     */
    static deployCommands(client, guilds, disconnectAfter = false) {

        // todo => disconnect after if true
        //client.destroy();


        // update all guilds (commands & permissions)
        guilds.forEach(guild => {

            // first -> update guild's commands
            this.registerGuildCommands(client, guild).then(() => {
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
                    // todo => notifier échec de mise à jour des permissions
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
                });
            });
        });
    }

    /**
     * @Comment register or update guild commands
     * @param client
     * @param guild
     * @returns {Promise<void>}
     */
     static async registerGuildCommands(client, guild) {

        const commands = [];
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            commands.push(command.data.toJSON());
        }

        try {
            await new REST().setToken(token).put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: commands });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = { CommandDeployer };
