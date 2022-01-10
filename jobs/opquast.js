const fs = require("fs");
const {Publisher} = require("../Class/Publisher");

module.exports = {
    cronTime: '0 0 9,15,21 * * 1-6',
    description: 'Opquast rules',
    execute (channel) {
        const ruleId = Publisher.getUnusedRuleId(`${channel.guildId}.json`);
        try {
            channel.send(Publisher.getFormatedMessage(ruleId));
            console.log(`executing scheduled job -> ${this.description}`);
            Publisher.updateHistory(`${channel.guildId}.json`, ruleId);
        } catch (e) {
            console.error(e);
        }
    }
};
