const cron = require("cron");
const {Collection} = require("discord.js");

class Scheduler {

    constructor() {}

    addJob(job, channel) {
        /* define cron job for scheduled publications */
        console.log(`Scheduling "${job.description}"...`);
        const cronJob = new cron.CronJob(job.cronTime, () => {
            job.execute(channel)
        });
        try {
            cronJob.start();
            console.log(`"${job.description}" successfully scheduled !`);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = { Scheduler };
