module.exports = {
    name: 'guildCreate',
    execute (guild, client) {
        console.log(guild.client); //TODO test guild.client (if ok, remove client parameter)
        console.log("Joined a new guild: " + guild.name);
        //console.log(client.guilds.cache);
    }
};