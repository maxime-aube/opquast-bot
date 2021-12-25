const { SlashCommandBuilder } = require('@discordjs/builders');
const checklist = require("../checklist.min.json");
const checklistThema = require("../checklist-thema.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opquast')
        .setDescription('Publie des règles Opquast.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('rule')
                .setDescription('Donne une règle Opquast par numéro')
                .addIntegerOption(option =>
                    option
                        .setName('number')
                        .setDescription('Quel numéro de règle Opquast ?')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('langue')
                        .setDescription('Dans quelle langue afficher la règle Opquast ?')
                        .addChoice('français', 'fr')
                        .addChoice('english', 'en')
                        .addChoice('español', 'es')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('random')
                .setDescription('Publie une règle choisie aléatoirement')
                .addStringOption(option =>
                    option
                        .setName('thème')
                        .setDescription('Afficher une règle issue de quel thème ?')
                        .addChoice('Contenus', 'Content')
                        .addChoice('Données personnelles', 'Personal data')
                        .addChoice('E-Commerce', 'E-Commerce')
                        .addChoice('Formulaires', 'Forms')
                        .addChoice('Identification et contact', 'Identification and contact')
                        .addChoice('Images et médias', 'Images and media')
                        .addChoice('Internationalisation', 'Internationalization')
                        .addChoice('Liens', 'Links')
                        .addChoice('Navigation', 'Navigation')
                        .addChoice('Newsletter', 'Newsletter')
                        .addChoice('Présentation', 'Presentation')
                        .addChoice('Sécurité', 'Security')
                        .addChoice('Serveur et performances', 'Server and performances')
                        .addChoice('Structure et code', 'Structure and code')
                )
                .addStringOption(option =>
                    option
                        .setName('langue')
                        .setDescription('Dans quelle langue afficher la règle Opquast ?')
                        .addChoice('français', 'fr')
                        .addChoice('english', 'en')
                        .addChoice('español', 'es')
                )
        ),

    async execute(interaction) {

        let lang;
        if (interaction.options.getString('langue')) lang = interaction.options.getString('langue');
        else lang = 'fr';

        if (interaction.options.getSubcommand() === 'rule') {           /* sub-commande pour afficher une règle par numéro */
            const ruleId = interaction.options.getInteger('number');
            await interaction.reply({
                content: getReplyContent(ruleId, lang)
            });

        } else if (interaction.options.getSubcommand() === 'random') {  /* sub-commande pour afficher une règle aléatoirement */
            const thema = interaction.options.getString('thème');

            await interaction.reply({
                content: getReplyContent(false, lang, thema)
            });
        }
    },
};

function getReplyContent(ruleId = 0,  lang = 'fr', thema = '') {

    if (!ruleId && thema === '') {              /* full aléatoire */
        ruleId = ((min = 1, max = 240) => { return Math.floor(Math.random() * (max - min + 1)) + min })();
    } else if (!ruleId && thema !== '') {      /* choisir aléatoirement dans le thème donné */
        ruleId = ((
            min = parseInt(checklistThema[thema][0]),
            max = parseInt(checklistThema[thema][checklistThema[thema].length - 1])
        ) => {
                return Math.floor(Math.random() * (max - min + 1)) + min }
        )();
    }

    const rule = checklist[ruleId.toString()];
    return `n°${ruleId} : ${rule.description[lang]}`;
}
