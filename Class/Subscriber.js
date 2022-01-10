const fs = require("fs");
const {Publisher} = require("./Publisher");

class Subscriber {

    constructor() {}

    /**
     * subscribe channel to publications
     */
    static subscribe(guildId, channelId, overrideHistory = false) {
        if (guildId === '' || channelId === '') throw new Error('Called Subscriber.subscribe() with empty guildId or channelId.');
        const subscriptions = JSON.parse(fs.readFileSync('./publication-subscriptions.json', 'utf-8'));
        subscriptions[guildId] = channelId;
        fs.writeFileSync('./publication-subscriptions.json', JSON.stringify(subscriptions, null, 2), 'utf-8');
        console.log(`Subscribed channel ${channelId} to publications`);
        if (overrideHistory) this.makeHistory(guildId);
    }

    /**
     * unsubscribe channel from publications
     */
    static unsubscribe(guildId, deleteHistory = true) {
        if (guildId === '') throw new Error('Called Subscriber.unsubscribe() with empty guildId.');
        const subscriptions = JSON.parse(fs.readFileSync('./publication-subscriptions.json', 'utf-8'));
        const channelId = subscriptions[guildId];
        delete subscriptions[guildId];
        fs.writeFileSync('./publication-subscriptions.json', JSON.stringify(subscriptions, null, 2), 'utf-8');
        console.log(`Unsubscribed channel ${channelId} from publications`);
        if (deleteHistory) {
            try {
                fs.unlinkSync(`history/${guildId}.json`);
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
