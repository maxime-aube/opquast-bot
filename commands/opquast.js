const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opquast')
        .setDescription('Répond par une règle Opquast.'),
    async execute(interaction) {
        await interaction.reply('Bientôt je serai capable de te donner les règles Opquast ! 🤞');
    },
};
