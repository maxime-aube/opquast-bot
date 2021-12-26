const {channels} = require("../config.json");
const scheduler = require("../Scheduler");
const fs = require("fs");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        /* Get the Opquast channel to use in scheduled publications */
        client.channels.fetch(channels.opquast.id)
            .then(channel => {
                console.log(`Successfully loaded ${channel.name} channel !`);

                /* schedule publications */
                const schedule = new scheduler.Scheduler();
                const scheduleFiles = fs.readdirSync('./jobs').filter(file => file.endsWith('.js'));
                for (const file of scheduleFiles) {
                    const job = require(`../jobs/${file}`);
                    schedule.addJob(job.cronExpression, job.execute(channel), job.description);
                }
                console.log(`${client.user.tag} is ready to Opquast !`);
            })
            .catch(error => {
                console.error(error)
            });
    },
};
