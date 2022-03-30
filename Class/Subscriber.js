const fs = require("fs");
const {Publisher} = require("./Publisher");

class Subscriber {

    constructor() {}

    /**
     * return subscriptions in json format from file
     */
    static getSubscriptions() {
        return JSON.parse(fs.readFileSync('./publication-subscriptions.json', 'utf-8'));
    }

    /**
     * Subscribe a channel to publications
     */
    static setSubscribedChannel(channel) {
        const subscriptions = this.getSubscriptions();
        if (!subscriptions[channel.guild.id]) subscriptions[channel.guild.id] = { "channelId": channel.id };
        else subscriptions[channel.guild.id].channelId = channel.id;
        fs.writeFileSync('./publication-subscriptions.json', JSON.stringify(subscriptions, null, 2), 'utf-8');
    }

    /**
     * subscribe channel to publications
     */
    static subscribe(client, guild, channel, overrideHistory = false) {
        //register event's guild's specified channel to subscribers
        if (guild.id === '' || channel.id === '') throw new Error('Called Subscriber.subscribe() with empty guildId or channelId.');
        this.setSubscribedChannel(channel);
        if (overrideHistory) this.makeHistory(guild.id);
        console.log(`Subscribed channel ${channel.id} to publications`);
    }

    /**
     * unsubscribe channel from publications
     */
    static unsubscribe(client, guild, deleteHistory = true) {
        if (guild.id === '') throw new Error('Called Subscriber.unsubscribe() with empty guildId.');
        const subscriptions = this.getSubscriptions();
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
        const subscriptions = this.getSubscriptions();
        for (const subscribedGuildId in subscriptions) {
            if (guildId === subscribedGuildId) return true;
        }
        return false;
    }

    /**
     * return guild's subscribed channel, if there is one
     */
    static async getSubscribedChannel(client, guild) {
        const subscriptions = this.getSubscriptions();
        let subscribedChannel;
        await client.channels.fetch(subscriptions[guild.id].channelId)
            .then(channel => {
                subscribedChannel = channel;
            })
            .catch(e => {
                console.log(`Couldn't fetch a subscribed channel in guild ${guild.name} (${guild.id})`);
            });
        return subscribedChannel;
    }

    /**
     * only making history here 😎
     */
    static makeHistory(guildId) {
        fs.writeFileSync(`./history/${guildId}.json`, JSON.stringify({}, null, 2), 'utf-8');
        console.log(`created history/${guildId}.json history file`);
        Publisher.clearHistory(`${guildId}`); //writing clean history to generated file
    }
}

module.exports = { Subscriber };
