module.exports = {
    cronExpression: '0 0 9,15,21 * * 1-6',
    description: 'Opquast rules',
    execute (channel) {
        const now = new Date();
        channel
            .send(`test on : ${now.toLocaleDateString('fr-FR')} at ${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}`)
            .catch(console.error);
    }
};
