const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow, MessageButton} = require("discord.js");
const {Subscriber} = require("../Class/Subscriber");
const {Scheduler} = require("../Class/Scheduler");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subscribe')
        .setDefaultPermission(false)
        .setDescription(`Active les publications Opquast dans ce salon.`),

    async execute(interaction, client) {

        // slash command interaction
        if (!interaction.isButton()) {
            if (!Subscriber.isSubscribed(interaction.guildId)) {
                try {
                    Subscriber.subscribe(client, interaction.guild, interaction.channel, true);
                    Scheduler.updateSchedule(interaction.guild);
                    Scheduler.addJob(client, interaction.guild, interaction.channel); // new cron job
                    await interaction.reply({
                        content: `Subscribed channel to publications. Next publication is in ${Scheduler.getJobFormattedTimeout(Scheduler.getJob(client, interaction.guild))}.`,
                        ephemeral: true
                    });
                } catch (e) {
                    console.log(e);
                    await interaction.reply({
                        content: `Sorry, there was an error with subscribing this channel.`,
                        ephemeral: true
                    });
                }
            } else {
                const subscribedChannel = await Subscriber.getSubscribedChannel(client, interaction.guild);

                // channel already subscribed
                if (interaction.channel === subscribedChannel) {
                    await interaction.reply({
                        content: `This channel is already subscribed. Next publication is in ${Scheduler.getJobFormattedTimeout(Scheduler.getJob(client, interaction.guild))}.`,
                        ephemeral: true
                    });

                // channel migration
                } else {
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('yes')
                                .setLabel('Yes please')
                                .setStyle('SUCCESS'),
                            new MessageButton()
                                .setCustomId('no')
                                .setLabel('No thanks')
                                .setStyle('DANGER'),
                        );
                    await interaction.reply({
                        content: `This guild has another channel already subscribed (${subscribedChannel}). Do you want to move subscriptions to this channel instead ? (publication history will be transferred)`,
                        components: [row],
                        ephemeral: true
                    });
                }
            }

        // channel migration's button interaction
        } else {

            if (interaction.customId === 'yes') {

                Subscriber.setSubscribedChannel(interaction.channel); // update guild's subscribed channel
                Scheduler.deleteJob(client, interaction.guild) // stop old channel's cron job
                Scheduler.addJob(client, interaction.guild, interaction.channel); // start new channel's cron job

                await interaction.update({
                    content: `Publications moved from ${oldChannel} to this channel.`,
                    components: [],
                    ephemeral: true
                });

            } else if (interaction.customId === 'no') {
                await interaction.update({
                    content: `Didn't move publications.`,
                    components: [],
                    ephemeral: true
                });
            }
        }
    },
};
