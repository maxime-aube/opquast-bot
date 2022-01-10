const fs = require("fs");
const {Scheduler} = require("../Class/Scheduler");
const {channels} = require("../config.json");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        /* Get the Opquast channel to use in scheduled publications */
        // TODO execute on each subscribed channel
        client.channels.fetch(channels.opquast.id)
            .then(channel => {
                console.log(`Successfully loaded ${channel.name} channel !`);

                /* scheduler publications */
                const scheduler = new Scheduler();
                const scheduleFiles = fs.readdirSync('./jobs').filter(file => file.endsWith('.js'));
                for (const file of scheduleFiles) {
                    const job = require(`../jobs/${file}`);
                    scheduler.addJob(job, channel);
                }
                console.log(`${client.user.tag} is ready to Opquast !`);
            })
            .catch(error => {
                console.error(error)
            });
    },
};
