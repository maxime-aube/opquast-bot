const cron = require("cron");

class Scheduler {
    constructor() {}
    jobList = [];
    addJob(job, channel) {
        /* define cron job for scheduled publications */
        console.log(`Scheduling "${job.description}"...`);
        const cronJob = new cron.CronJob(job.cronTime, () => {
            job.execute(channel)
        });
        try {
            cronJob.start();
            this.jobList.push(cronJob);
            console.log(`"${job.description}" successfully scheduled !`);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = { Scheduler };
