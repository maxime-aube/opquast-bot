const fs = require("fs");
const {Publisher} = require("./Publisher");
const {Scheduler} = require("./Scheduler");

class Subscriber {

    constructor() {}

    /**
     * subscribe channel to publications
     */
    static subscribe(client, guild, channel, overrideHistory = false) {
        //register event's guild's specified channel to subscribers
        if (guild.id === '' || channel.id === '') throw new Error('Called Subscriber.subscribe() with empty guildId or channelId.');
        const subscriptions = JSON.parse(fs.readFileSync('./publication-subscriptions.json', 'utf-8'));
        if (!subscriptions[guild.id]) {
            subscriptions[guild.id] = { "channelId": channel.id };
        } else {
            subscriptions[guild.id].channelId = channel.id;
        }

        fs.writeFileSync('./publication-subscriptions.json', JSON.stringify(subscriptions, null, 2), 'utf-8');
        if (overrideHistory) this.makeHistory(guild.id);
        console.log(`Subscribed channel ${channel.id} to publications`);
    }

    /**
     * unsubscribe channel from publications
     */
    static unsubscribe(client, guild, deleteHistory = true) {
        if (guild.id === '') throw new Error('Called Subscriber.unsubscribe() with empty guildId.');
        const subscriptions = JSON.parse(fs.readFileSync('./publication-subscriptions.json', 'utf-8'));
        const channelId = subscriptions[guild.id];
        delete subscriptions[guild.id];
        fs.writeFileSync('./publication-subscriptions.json', JSON.stringify(subscriptions, null, 2), 'utf-8');
        console.log(`Unsubscribed channel ${channelId} from publications`);
        if (deleteHistory) {
            try {
                fs.unlinkSync(`history/${guild.id}.json`);
                console.log(`Deleted channel ${channelId}'s publication history`);
            } catch (e) {
                console.log(`Failed to delete ${channelId}'s publication history : ${e.message}`);
            }
        }
    }

    /**
     * return true if guild has a subscribed channel, otherwise false
     */
    static isSubscribed(guildId) {
        const subscriptions = JSON.parse(fs.readFileSync('./publication-subscriptions.json', 'utf-8'));
        for (const subscribedGuildId in subscriptions) {
            if (guildId === subscribedGuildId) return true;
        }
        return false;
    }

    /**
     * only making history here 😎
     */
    static makeHistory(guildId) {
        fs.writeFileSync(`./history/${guildId}.json`, JSON.stringify({}, null, 2), 'utf-8');
        console.log(`created history/${guildId}.json history file`);
        Publisher.clearHistory(`${guildId}.json`); //writing clean history to generated file
    }
}

module.exports = { Subscriber };
