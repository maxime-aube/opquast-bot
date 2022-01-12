module.exports = {
    name: 'interactionCreate',
    execute (interaction, client) {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction > /${commandName}${interaction.options._subcommand !== null && interaction.options.getSubcommand() === 'random' ? '/random' : ''}${interaction.options.getString('thème') !== null ? '/thema/"' + interaction.options.getString('thème') +'"' : ''}`);
        try {
            command.execute(interaction, client);
        } catch (error) {
            interaction.reply({ content: 'Whoops ! la commande a échoué 🤷', ephemeral: true });
            console.error(error);
        }
    }
};