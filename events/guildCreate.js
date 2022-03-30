const { Permissions } = require('discord.js');
const { CommandDeployer } = require("../Class/CommandDeployer");

module.exports = {
    name: 'guildCreate',
    execute (guild, client) {

        console.log("Joined a new guild: " + guild.name);

        // create role Opquast-Mod if not exists
        if (guild.roles.cache.find(role => role.name === "Opquast-Mod") === undefined) {
            guild.roles.create({
                name: "Opquast-Mod",
                color: "#1abc9c",
                reason: "Creating Opquast role with extended command permissions"
            });
        }

        // todo => give role Opquast-Mod to guild admins ?

        // deploy commands to new guild
        CommandDeployer.deployCommands(client, [guild]);        // todo => test deploy

    }
};