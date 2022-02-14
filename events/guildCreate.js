const { Permissions } = require('discord.js');

module.exports = {
    name: 'guildCreate',
    execute (guild) {
        console.log("Joined a new guild: " + guild.name);

        // console.log(guild.roles.create({ name: 'Opquast'}));
        console.log(guild.roles);
    }
};