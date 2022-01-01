module.exports = {
    name: 'messageCreate',
    execute(message) {
        const opquastRegex = /opquast|bot/i;
        try {
            if (opquastRegex.exec(message)) {
                console.log(`message matching regex ${opquastRegex} was sent by ${message.author.tag} -> "${message}"`);
                message.react('👀')
            }
        } catch (error) {
            interaction.reply({ content: 'Whoops ! la commande a échoué 🤷', ephemeral: true });
            console.error(error);
        }
    }
};