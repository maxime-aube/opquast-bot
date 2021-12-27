const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription(`Explications et fonctionnement`),
    async execute(interaction) {
        await interaction.reply({
            content: `La fiche descriptive est cours de rédaction et sera disponible prochainement. :fingers_crossed:`     // TODO rédiger la description du bot
        });
    },
};
