const { SlashCommandBuilder } = require('@discordjs/builders');
const {Subscriber} = require("../Class/Subscriber");
const {Scheduler} = require("../Class/Scheduler");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unsubscribe')
        .setDescription(`Désactive les publications Opquast de ce salon.`),
    async execute(interaction, client) {
        console.log('client: ' + client);
        if (!interaction.isCommand()) return;
        if (Subscriber.isSubscribed(interaction.guildId)) {
            try {
                Scheduler.deleteJob(client, interaction.guild);
                Subscriber.unsubscribe(client, interaction.guild, true);
                await interaction.reply({
                    content: `Unsubscribed this channel from publications.`
                });
            } catch (e) {
                await interaction.reply({
                    content: `Sorry, there was an error with unsubscribing this channel.`
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
