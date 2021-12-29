const fs = require("fs");
const { MessageEmbed, MessageAttachment } = require('discord.js');
const checklist = require("../checklist.min.json");
const checklistThema = require("../checklist-thema.json");
const { checklistURL, themaSprites } = require('../opquast.json');

class Publisher {

    constructor() {}

    /**
     * return random rule id, optionally within given thema
     */
    static getRandomRuleId(thema = null) {
        if (thema === null) {
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
    static getFormatedMessage(ruleId = false, lang = 'fr', theme = null) {

        if (ruleId === false) ruleId = this.getRandomRuleId(theme);
        const rule = checklist[ruleId];
        const embedFiles = {
            "thumbnail": new MessageAttachment(`./asset/img/${themaSprites[rule.thema[0].en]}`),
            "footer": new MessageAttachment('./asset/img/opquast-favicon.png')
        };
        const embed = new MessageEmbed()
            .setColor('#229a9a')
            .setTitle(`${rule.number}) ${rule.description[lang]}`)
            .setThumbnail(`attachment://${themaSprites[rule.thema[0].en]}`)
            .setDescription(`:memo: **${rule.thema[0][lang] !== '' ? rule.thema[0][lang] : rule.thema[0].en}**`)
            .setURL(`${checklistURL[lang] + rule.slug[lang]}`)
            .addField(`${lang === 'fr' ? 'Objectifs' : 'Goals'}`, `‣ ${(rule.goal[lang].join('\n‣ '))}`)
            // .addField('Steps', 'Some value here') /* todo ajouter steps */
            .setTimestamp()
            .setFooter(`Brought to you by OpquastBot·🎓\nCredit : Elie Sloïm, Laurent Denis and Opquast contributors\nLicence : Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)`, 'attachment://opquast-favicon.png');

        return {
            embeds: [embed],
            files: [
                embedFiles.thumbnail,
                embedFiles.footer
            ]
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
