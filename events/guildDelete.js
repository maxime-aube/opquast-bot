module.exports = {
    name: 'guildDelete',
    execute (guild, client) {
        console.log(guild.client); //TODO test guild.client (if ok, remove client parameter)
        console.log("Left a guild: " + guild.name);
        client.scheduler.deleteJob(`${guild.id}-publish`);
    }
};