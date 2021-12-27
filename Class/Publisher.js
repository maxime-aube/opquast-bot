const fs = require("fs");
const checklistThema = require("../checklist-thema.json");
const checklist = require("../checklist.min.json");

class Publisher {

    constructor() {}

    /**
     * return random rule id, optionally within given thema
     */
    static getRandomRuleId(thema = '') {
        if (thema === '') {
            /* full aléatoire */
            return ((min = 1, max = 240) => { return Math.floor(Math.random() * (max - min + 1)) + min })();
        } else {
            /* choisir aléatoirement dans le thème donné */
            return ((
                    min = parseInt(checklistThema[thema][0]),
                    max = parseInt(checklistThema[thema][checklistThema[thema].length - 1])
                ) => {
                    return Math.floor(Math.random() * (max - min + 1)) + min }
            )();
        }
    }

    /**
     * return random unpublished rule id
     */
    static getUnusedRuleId() {
        const history = JSON.parse(fs.readFileSync('./publication-history.json', 'utf-8'));
        let unusedRules = [];
        for (let entry in history) {
            if (history[entry] === 0) unusedRules.push(entry);
        }
        if (unusedRules.length === 0) {
            this.clearHistory();
            return this.getUnusedRuleId();
        }
        return unusedRules[((min = 0, max = (unusedRules.length - 1)) => {
            return Math.floor(Math.random() * (max - min + 1)) + min
        })()];
    }

    /**
     * return formatted message content with given or random rule
     * @param ruleId
     * @param lang
     * @param thema
     * @returns {{content: string}}
     */
    static getFormatedMessage(ruleId = 0, lang = 'fr', thema = '') {
        if (!ruleId) ruleId = this.getRandomRuleId(thema);
        const rule = checklist[ruleId.toString()];
        return {
            content: `n°${ruleId} : ${rule.description[lang]}`
        };
    }

    /**
     * update publication history with given rule
     */
    static updateHistory(rule) {

        let history = JSON.parse(fs.readFileSync('./publication-history.json', 'utf-8'));

        if (history[rule] == null) history[rule] = 1;
        else history[rule] += 1;

        try {
            fs.writeFileSync('./publication-history.json', JSON.stringify(history, null, 2), 'utf-8');
            console.log(`Successfully updated publication history with rule n°${rule}.`)
        } catch(e) {
            console.error(e);
        }
    }

    /**
     * remet le compteur à zéro pour toutes les règles dans publication-history.json
     */
    static clearHistory() {
        let history = {};
        for (let i = 1; i <= 240; i++) history[i] = 0;
        try {
            fs.writeFileSync('./publication-history.json', JSON.stringify(history, null, 2), 'utf-8');
            console.log('Successfully cleared publication history !')
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = { Publisher };
