const { SlashCommandBuilder } = require('@discordjs/builders');
const checklist = require("../checklist.min.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opquast')
        .setDescription('Répond par une règle Opquast.'),
    async execute(interaction) {
        await interaction.reply(`Bientôt je serai capable de te donner les règles Opquast ! 🤞\n par exemple : règle n°6 : ${checklist["6"].description.fr}`);
    },
};
