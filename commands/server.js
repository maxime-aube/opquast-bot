const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Infos de base sur le serveur.'),
    async execute(interaction) {
        await interaction.reply(` Serveur de dev '${interaction.guild.name}'\ncréé le ${interaction.guild.createdAt.toLocaleDateString('fr-FR')}\nQuoi d'autre ?`);
    },
};
