const { SlashCommandBuilder } = require('@discordjs/builders');
const {Subscriber} = require("../Class/Subscriber");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unsubscribe')
        .setDescription(`Désactive les publications Opquast de ce salon.`),
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        if (Subscriber.isSubscribed(interaction.guildId)) {
            try {
                Subscriber.unsubscribe(interaction.guildId, true);
                // TODO Scheduler (delete cron job)
                await interaction.reply({
                    content: `Unsubscribed this channel from publications.`
                });
            } catch (e) {
                await interaction.reply({
                    content: `There was an error with unsubscribing this channel.`
                });
                console.log(e);
            }

        } else {
            await interaction.reply({
                content: `Channel was not subscribed to publications.`
            });
        }
    },
};
