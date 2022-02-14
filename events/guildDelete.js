module.exports = {
    name: 'guildDelete',
    execute (guild) {
        console.log("Left a guild: " + guild.name);
        guild.client.scheduler.deleteJob(`${guild.id}-publish`);
        //todo remove from publication-subscriptions.json
    }
};