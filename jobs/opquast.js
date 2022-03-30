const {Publisher} = require("../Class/Publisher");

module.exports = {
    defaultCronTime: '0 0 9,15,21 * * 1-5',
    // defaultCronTime: '*/10 * * * * 1-5',
    name: 'publish',
    description: 'Publish Opquast rules regularly',
    execute (channel) {
        const ruleId = Publisher.getUnusedRuleId(`${channel.guildId}`);
        try {
            channel.send(Publisher.getFormatedMessage(ruleId));
            console.log(`executing scheduled job -> ${this.description}`);
            Publisher.updateHistory(`${channel.guildId}.json`, ruleId);
        } catch (e) {
            console.error(e);
        }
    }
};
