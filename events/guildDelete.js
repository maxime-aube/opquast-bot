const { Scheduler } = require("../Class/Scheduler");
const { Subscriber } = require("../Class/Subscriber");
const { error } = require("winston");

module.exports = {
    name: 'guildDelete',
    execute (guild, client) {

        console.log("Left a guild: " + guild.name); // log guild delete
        Subscriber.unsubscribe(client, guild); // remove guild from subscriptions
        Scheduler.deleteJob(client, guild); // delete publication cron job

        // todo => test : delete role Opquast-Mod after guild delete
        try {
            guild.roles.delete(guild.roles.cache.find(role => role.name === "Opquast-Mod"));
            console.log(`Deleted role Opquast-Mod from guild (${guild})`);
        } catch (e) {
            console.log(e);
        }
    }
};