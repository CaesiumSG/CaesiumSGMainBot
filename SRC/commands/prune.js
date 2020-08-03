module.exports = {
	name: 'prune',
	description: 'Prune up to 99 messages.',
	execute(message, args) {
        if (message.member.roles.cache.some(role => role.name === 'Owner')) 
        {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('thats not a valid number u dumbo, command is c!prune [1-100].');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
        });
    }
    else
    {
        return message.reply('no perms haha gay');

    }
    },

};