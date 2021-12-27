const fs = require("fs");
const {Publisher} = require("../Class/Publisher");

module.exports = {
    // cronTime: '0 0 9,15,21 * * 1-6',
    cronTime: '*/15 * * * * *',
    description: 'Opquast rules',
    execute (channel) {
        const ruleId = Publisher.getUnusedRuleId();
        try {
            channel.send(Publisher.getFormatedMessage(ruleId));
            Publisher.updateHistory(ruleId);
        } catch (e) {
            console.error(e);
        }
    }
};
