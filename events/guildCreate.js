module.exports = {
    name: 'guildCreate',
    execute (guild, client) {
        console.log("Joined a new guild: " + guild.name);
        //console.log(client.guilds.cache);
    }
};