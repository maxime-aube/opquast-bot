const { SlashCommandBuilder } = require('@discordjs/builders');
const {Subscriber} = require("../Class/Subscriber");
const {Scheduler} = require("../Class/Scheduler");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subscribe')
        .setDescription(`Active les publications Opquast dans ce salon.`),
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        if (!Subscriber.isSubscribed(interaction.guildId)) {
            try {
                Subscriber.subscribe(client, interaction.guild, interaction.channel, true);
                Scheduler.updateSchedule(interaction.guild);
                Scheduler.addJob(client, interaction.guild, interaction.channel); // new cron job
                await interaction.reply({
                    content: `Subscribed channel to publications. Next publication is in ${Scheduler.getJobFormattedTimeout(Scheduler.getJob(client, interaction.guild))}.`
                });
            } catch (e) {
                console.log(e);
                await interaction.reply({
                    content: `Sorry, there was an error with subscribing this channel.`
                });
            }
        } else {
            // TODO handle channel migration
            await interaction.reply({
                content: `This channel is already subscribed. Next publication is in ${Scheduler.getJobFormattedTimeout(Scheduler.getJob(client, interaction.guild))}.`
            });
        }
    },
};
