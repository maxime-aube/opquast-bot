const fs = require("fs");
const {Scheduler} = require("../Scheduler");
const {channels} = require("../config.json");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        /* Get the Opquast channel to use in scheduled publications */
        client.channels.fetch(channels.opquast.id)
            .then(channel => {
                console.log(`Successfully loaded ${channel.name} channel !`);

                /* schedule publications */
                const schedule = new Scheduler();
                const scheduleFiles = fs.readdirSync('./jobs').filter(file => file.endsWith('.js'));
                for (const file of scheduleFiles) {
                    const job = require(`../jobs/${file}`);
                    schedule.addJob(job, channel);
                }
                console.log(`${client.user.tag} is ready to Opquast !`);
            })
            .catch(error => {
                console.error(error)
            });
    },
};
