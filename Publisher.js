const fs = require("fs");
const checklistThema = require("./checklist-thema.json");
const checklist = require("./checklist.min.json");

class Publisher {

    constructor() {}

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

    static getFormatedMessage(ruleId = 0, lang = 'fr', thema = '') {
        if (!ruleId) ruleId = this.getRandomRuleId(thema);
        const rule = checklist[ruleId.toString()];
        return {
            content: `n°${ruleId} : ${rule.description[lang]}`
        };
    }

    /*  TODO : choisir une règle aléatoirement dans la checklist parmi celles qui ont pas encore été publiées */
    static updateHistory(rule) {

        let history = JSON.parse(fs.readFileSync('./publication-history.json', 'utf-8'));

        if (history[rule] == null) history[rule] = 1;
        else history[rule] += 1;

        //  maj publication history
        try {
            fs.writeFileSync('./publication-history.json', JSON.stringify(history, null, 2), 'utf-8');
            console.log(`Successfully updated publication history with rule n°${rule}.`)
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = { Publisher };
