const { SlashCommandBuilder } = require('@discordjs/builders');
const {Subscriber} = require("../Class/Subscriber");
const {Scheduler} = require("../Class/Scheduler");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule')
        .setDescription(`Règle la fréquence des publications`)
        .addStringOption(option =>
            option
                .setName('fréquence')
                .setDescription('La fréquence de publication')
                .setRequired(true)
                .addChoice('pause', 'pause')
                .addChoice('10sec (test)', '*/10 * * * * 1-6')
                .addChoice('3/jour sauf W-E', '0 0 9,15,21 * * 1-5')
                .addChoice('3/jour', '0 0 9,15,21 * * 0-6')
                .addChoice('2/jour sauf W-E', '0 0 9,15 * * 1-5')
                .addChoice('2/jour', '0 0 9,15 * * 0-6')
                .addChoice('1/jour sauf W-E', '0 0 9 * * 1-5')
                .addChoice('1/jour', '0 0 9 * * 0-6')
        ),
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        if (Subscriber.isSubscribed(interaction.guildId)) {
            // TODO : also update publication-subscriptions.json file accordingly
            try {
                Scheduler.deleteJob(client, interaction.guild);
                if (interaction.options.getString('fréquence') === 'pause') {
                    await interaction.reply({
                        content: `Publications paused.`
                    });
                } else {
                    Scheduler.addJob(client, interaction.guild, interaction.channel, interaction.options.getString('fréquence'));
                    await interaction.reply({
                        content: `Updated publication schedule to ${interaction.options.getString('fréquence')}.`
                    });
                }

            } catch (e) {
                console.log(e);
                await interaction.reply({
                    content: `Sorry, there was an error with scheduling publications.`
                });
            }
        } else {
            await interaction.reply({
                content: `This channel isn't subscribed to publication. Please run /subscribe before scheduling.`
            });
        }
    },
};
