const cron = require('cron');
const {channels} = require("../config.json");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        /* Get the Opquast channel to use in scheduled publications */
        client.channels.fetch(channels.opquast.id)
            .then(channel => {
                console.log(`Successfully loaded ${channel.name} channel !`);

                /* define cron job for scheduled publications */
                console.log('scheduling publications...');
                const job = new cron.CronJob('0 0 9,15,21 * * 1-6', () => {
                    const now = new Date();
                    channel.send(`test on : ${now.toLocaleDateString('fr-FR')} at ${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}`)
                        .catch(console.error);
                });
                try {
                    job.start();
                    console.log(`Publications successfully scheduled !`);
                } catch (e) {
                    console.log(e);
                }
                console.log(`${client.user.tag} is ready to Opquast !`);
            })
            .catch(error => {
                console.error(error)
            });
    },
};
