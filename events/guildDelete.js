const Scheduler = require('../Class/Scheduler');
const Subscriber = require('../Class/Subscriber');

module.exports = {
    name: 'guildDelete',
    execute (guild, client) {
        console.log("Left a guild: " + guild.name); // log guild delete
        Subscriber.unsubscribe(client, guild); // remove guild from subscriptions
        Scheduler.deleteJob(client, guild); // delete publication cron job
    }
};