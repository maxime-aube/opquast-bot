module.exports = {
    name: 'interactionCreate',
    execute (interaction) {
        if (!interaction.isCommand() && !interaction.isButton()) return;

        let commandName;
        if (interaction.isButton())  {
            commandName = interaction.message.interaction.commandName;
        } else {
            commandName = interaction.commandName;
        }
        const command = interaction.client.commands.get(commandName);
        if (!command) {
            interaction.reply({
                content: `Sorry, this command wasn't recognized.`,
                ephemeral: true
            });
            console.log(`${interaction.user.tag} triggered an unrecognized command in #${interaction.channel.name} > /${commandName}`);
            return;
        }

        if (!interaction.isButton()) {
            console.log(`${interaction.user.tag} triggered a command in #${interaction.channel.name} > /${commandName}${interaction.options._subcommand !== null && interaction.options.getSubcommand() === 'random' ? '/random' : ''}${interaction.options.getString('thème') !== null ? '/thema/"' + interaction.options.getString('thème') +'"' : ''}`);
        } else {
            console.log(`${interaction.user.tag} triggered a button interaction in #${interaction.channel.name} > /${commandName} with "${interaction.customId}"`);
        }

        if (!interaction.member.permissions.has(command.permissions || [])) {
            interaction.reply({
                content: `You do not have permission to execute this command`,
                ephemeral: true
            });
        } else {
            try {
                command.execute(interaction, interaction.client);
            } catch (error) {
                interaction.reply({
                    content: 'Whoops ! la commande a échoué 🤷',
                    ephemeral: true
                });
                console.error(error);
            }
        }

    }
};