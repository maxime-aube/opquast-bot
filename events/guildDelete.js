module.exports = {
    name: 'guildDelete',
    execute (guild, client) {
        console.log("Left a guild: " + guild.name);
        client.scheduler.deleteJob(`${guild.id}-publish`);
    }
};