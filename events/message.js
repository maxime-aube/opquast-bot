module.exports = {
    name: 'messageCreate',
    execute(message) {
        const opquastRegex = /opquast/i;
        try {
            if (opquastRegex.exec(message)) {
                console.log(`message matching 'opquast' was created by ${message.author.tag} -> "${message}"`);
                message.react('👀')
            }
        } catch (error) {
            interaction.reply({ content: 'Whoops ! la commande a échoué 🤷', ephemeral: true });
            console.error(error);
        }
    }
};