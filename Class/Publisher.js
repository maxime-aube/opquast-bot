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
    static getUnusedRuleId(guildId) {

        const history = JSON.parse(fs.readFileSync(`history/${guildId}.json`, 'utf-8'));
        let unusedRules = [];
        for (let i = 1; i <= 240; i++) {
            if (i in history) continue;
            unusedRules.push(i);
        }

        if (unusedRules.length === 0) {
            this.clearHistory(guildId);
            return this.getUnusedRuleId(guildId);
        }

        return unusedRules[((min = 0, max = (unusedRules.length - 1)) => {
            return Math.floor(Math.random() * (max - min + 1)) + min
        })()];
    }

    /**
     * return formatted message content with given or random rule
     */
    static getFormatedMessage(ruleId = false, lang = 'fr', theme = null) {

        if (ruleId === false) ruleId = this.getRandomRuleId(theme);
        const rule = checklist[ruleId];
        const embedFiles = {
            "thumbnail": new MessageAttachment(`./asset/img/${themaSprites[rule.thema[0].en]}`),
            "footer": new MessageAttachment('./asset/img/opquast-favicon.png')
        };

        const embed = new MessageEmbed()
            .setColor('#2f4554')
            .setTitle(`${rule.number}) ${rule.description[lang]}`)
            .setThumbnail(`attachment://${themaSprites[rule.thema[0].en]}`)
            .setDescription(`:memo: **${rule.thema[0][lang] !== '' ? rule.thema[0][lang] : rule.thema[0].en}**`)
            .setURL(`${checklistURL[lang] + rule.slug[lang]}`)
            .addField(`${lang === 'fr' ? 'Objectifs' : 'Goals'}`, `‣ ${rule.goal[lang].length > 0 ? (rule.goal[lang].join('\n‣ ')) : rule.goal.en.join('\n‣ ')}`)
            // .addField('Steps', 'Some value here') /* todo add steps attribute from checklist */
            .setFooter(`Brought to you by OpquastBot·🎓\nCredit : Elie Sloïm, Laurent Denis and Opquast contributors\nLicence : Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)`, 'attachment://opquast-favicon.png')
            .setTimestamp()
        ;

        return {
            embeds: [embed],
            files: [
                embedFiles.thumbnail,
                embedFiles.footer
            ]
        };
    }


    /**
     * update publication history : increment given rule's pub count
     */
    static updateHistory(historyFileName, rule) {

        let history = JSON.parse(fs.readFileSync(`history/${historyFileName}`, 'utf-8'));

        if (history[rule] == null) history[rule] = 1;
        else history[rule] += 1;

        try {
            fs.writeFileSync(`history/${historyFileName}`, JSON.stringify(history, null, 2), 'utf-8');
            console.log(`Successfully updated publication history with rule n°${rule}.`);
        } catch(e) {
            console.error(e);
        }
    }

    /**
     * reset channel's publication history
     */
    static clearHistory(guildId) {
        let history = {};
        try {
            fs.writeFileSync(`./history/${guildId}.json`, JSON.stringify(history, null, 2), 'utf-8');
            console.log(`Successfully cleared publication history (${guildId}.json)`);
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = { Publisher };
