const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription(`Infos de base sur l'utilisateur à l'origine de la commande`),
    async execute(interaction) {
        await interaction.reply(`ton tag: ${interaction.user.tag}\nton id: ${interaction.user.id}\nde rien`);
    },
};