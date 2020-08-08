module.exports = {
    name: "setup",
    description: "setup bot channel",
    execute(message) {
    	const client = message.client
    const guild = message.guild
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) { return message.reply("I need the permission ``MANAGE_CHANNELS`` for this command")
  }
    if (message.member.hasPermission("MANAGE_GUILD")) {
    	if (!guild.channels.cache.find(channel => channel.name === 'CaesiumSGBot-Welcomes!')) {
    	    	guild.channels.create('CaesiumSGBot-Welcomes!', {
    type: 'text',
    permissionOverwrites: [
        {
            id: message.guild.id,
            deny: ['SEND_MESSAGES'],
        },
        {
            id: message.guild.me.id,
            allow: ['SEND_MESSAGES'],
        },
    ],
});
    message.channel.send("channel welcome created")
    }else message.channel.send("the channel ``CaesiumSGBot-Welcomes!`` is already here")
    
    if (!guild.channels.cache.find(channel => channel.name === 'CaesiumSGBot-byes!')) {
    	guild.channels.create('CaesiumSGBot-byes', {
    type: 'text',
    permissionOverwrites: [
        {
            id: message.guild.id,
            deny: ['SEND_MESSAGES'],
        },
        {
            id: message.guild.me.id,
            allow: ['SEND_MESSAGES'],
        },
    ],
});
    message.channel.send("CaesiumSGBot-byes! created")
    }else {message.channel.send("the channel ``CaesiumSGBot-byes!`` is already here")
    }
    if (!guild.channels.cache.find(channel => channel.name === 'chat-logs')) {
    	guild.channels.create('chat-logs', {
    type: 'text',
    permissionOverwrites: [
        {
            id: message.guild.id,
            deny: ['SEND_MESSAGES'],
        },
        {
            id: message.guild.me.id,
            allow: ['SEND_MESSAGES'],
        },
    ],
});
    message.channel.send("chat-logs created")
    }else {message.channel.send("the channel ``CaesiumSGBot-byes!`` is already here")
    }
    }else return message.reply("you need the permission ``MANAGE_GUILD`` for this command")
    }
    }