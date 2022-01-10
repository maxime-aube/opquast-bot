const { SlashCommandBuilder } = require('@discordjs/builders');
const {Subscriber} = require("../Class/Subscriber");
const {Scheduler} = require("../Class/Scheduler");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subscribe')
        .setDescription(`Active les publications Opquast dans ce salon.`),
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        if (!Subscriber.isSubscribed(interaction.guildId)) {
            try {
                Subscriber.subscribe(interaction.guildId, interaction.channelId, true);
                // TODO Scheduler (new cron job)
                await interaction.reply({
                    content: `Subscribed channel to publications`
                });
            } catch (e) {
                console.log(e);
            }

        } else {
            await interaction.reply({
                content: `This channel is already subscribed.`
            });
        }
    },
};
