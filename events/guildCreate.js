const { Permissions } = require('discord.js');

module.exports = {
    name: 'guildCreate',
    execute (guild) {
        console.log("Joined a new guild: " + guild.name);

        // create role Opquast-Mod
        guild.roles.create({
            name: "Opquast-Mod",
            color: "#1abc9c",
            reason: "Creating Opquast authorized role"
        });

        guild.roles.fetch().then(roles => {
            console.log(roles);
        });

        // todo deploy guild commands with permissions
    }
};