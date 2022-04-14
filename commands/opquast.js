const { SlashCommandBuilder } = require('@discordjs/builders');
const Publisher = require('../Class/Publisher');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opquast')
        .setDescription('Poste des règles Opquast.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('rule')
                .setDescription('Poste une règle Opquast par numéro')
                .addIntegerOption(option =>
                    option
                        .setName('number')
                        .setDescription('Le numéro de règle')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('langue')
                        .setDescription('Dans quelle langue ?')
                        .addChoice('français', 'fr')
                        .addChoice('english', 'en')
                        .addChoice('español', 'es')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('random')
                .setDescription('Poste une règle aléatoire')
                .addStringOption(option =>
                    option
                        .setName('thème')
                        .setDescription('Choisir un thème')
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
                        .setDescription('Dans quelle langue ?')
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
            await interaction.reply(Publisher.getFormatedMessage(ruleId, lang));

        } else if (interaction.options.getSubcommand() === 'random') {  /* sub-commande pour afficher une règle aléatoirement */
            const thema = interaction.options.getString('thème');
            await interaction.reply(Publisher.getFormatedMessage(false, lang, thema));
        }
    },
};
