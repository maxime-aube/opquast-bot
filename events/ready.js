const fs = require("fs");
const { Scheduler } = require("../Class/Scheduler");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const subscriptions = JSON.parse(fs.readFileSync('./publication-subscriptions.json', 'utf-8')); //channels to be used in scheduled publications
        for (const subscribedGuildId in subscriptions) {
            client.channels.fetch(subscriptions[subscribedGuildId].channelId)
            .then(channel => {
                Scheduler.addJob(client, channel.guild, channel, subscriptions[subscribedGuildId].cronTime); //new scheduled task
            })
            .catch(e => console.log(e));
        }
        console.log(`${client.user.tag} is ready to Opquast !`);
    },
};
