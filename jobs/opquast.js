const fs = require("fs");
const {Publisher} = require("../Publisher");

module.exports = {
    // cronTime: '0 0 9,15,21 * * 1-6',
    cronTime: '*/15 * * * * *',
    description: 'Opquast rules',
    execute (channel) {
        /*  send message */
        const ruleId = Publisher.getRandomRuleId();
        const now = new Date();
        channel
            // .send(`test on : ${now.toLocaleDateString('fr-FR')} at ${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}`)
            .send(Publisher.getFormatedMessage(ruleId))
            .catch(console.error);
        Publisher.updateHistory(ruleId);
    }
};
