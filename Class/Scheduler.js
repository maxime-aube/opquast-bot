const fs = require("fs");

class Scheduler {

    constructor() {}

    /* add cron job */
    static addJob(client, guild, channel, cronTime = '') {
        const scheduleFiles = fs.readdirSync('./jobs').filter(file => file.endsWith('.js'));
        for (const file of scheduleFiles) {
            try {
                const job = require(`../jobs/${file}`);
                console.log(`Scheduling "${job.name}" in ${guild.name}...`);
                client.scheduler.add(`${guild.id}-${job.name}`, cronTime === '' ? job.defaultCronTime : cronTime, () => {
                    job.execute(channel);
                });
                client.scheduler.start(`${guild.id}-${job.name}`);
                console.log(`"${job.description}" successfully scheduled !`);
                // console.log(this.getJobTimeout(this.getJob(client, guild)));
            } catch (e) {
                console.log(e);
            }
        }
    }

    /* return a guild's cron job  */
    static getJob(client, guild, type = 'publish') {
        return client.scheduler.jobs[`${guild.id}-${type}`];
    }

    /* delete cron job */
    static deleteJob(client, guild) {
        const job = this.getJob(client, guild);
        if (job !== undefined) {
            try {
                client.scheduler.deleteJob(`${guild.id}-publish`);
            } catch (e) {
                console.log(e);
            }
        } else  {
            console.log(`Guild (${guild.id}) didn't have a scheduled job. Nothing to delete`);
        }
    }

    /* update channel's publication schedule. Does NOT start/stop cron jobs */
    static updateSchedule(guild, cronTime = '0 0 9,15,21 * * 1-5') {
        try {
            const subscriptions = JSON.parse(fs.readFileSync('./publication-subscriptions.json', 'utf-8'));
            subscriptions[guild.id].cronTime = cronTime;
        } catch (e) {
            console.log(e);
        }
    }

    /*

     */
    static getJobTimeout(job) {
        return Math.abs(new Date(job.nextDates()) - new Date());
    }

    /* return formatted string of time left before job executes */
    static getJobFormattedTimeout(job) {
        const timeout = this.getJobTimeout(job);
        const days = Math.floor(timeout / 1000 / 3600 / 24);
        const hours = Math.floor(timeout / 1000 / 3600);
        const minutes = Math.floor((timeout / 1000 - (hours * 3600)) / 60);
        const seconds = Math.floor(timeout / 1000 - (hours * 3600) - (minutes * 60));
        return (
            (days > 0 ? days + 'j ': '') +
            (hours > 0 ? (hours < 10 ? '0' : '') + hours + 'h ': '') +
            (minutes > 0 ? (minutes < 10 ? '0' : '') + minutes + 'min ' : '') +
            (seconds < 10 ? '0' : '') + seconds + 's'
        );
    }
}

module.exports = { Scheduler };
