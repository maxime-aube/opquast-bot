const {Publisher} = require("../Class/Publisher");

/*
    run with parameter -> example with guild id :
    npm run clear-history -- 912838027062177843
 */

process.argv.slice(2).forEach(guildId => {
    Publisher.clearHistory(`${guildId}.json`);
});