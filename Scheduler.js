const cron = require("cron");

class Scheduler {
    constructor() {}
    jobList = [];
    addJob(cronExpression, callback, description) {
        /* define cron job for scheduled publications */
        console.log(`Scheduling "${description}"...`);
        const job = new cron.CronJob(cronExpression, callback, );
        try {
            job.start();
            this.jobList.push(job);
            console.log(`"${description}" successfully scheduled !`);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = { Scheduler };
