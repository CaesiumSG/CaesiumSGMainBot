module.exports = {
    name: "youtube",
    cooldown: 5,
    description: "search a youtube video on discord",
    usage: "[message]",
    execute(message) {
        const Discord = require('discord.js')
        let MSG = message.content.split(" ").slice(1).join("+");
        let MS = message.content.split(" ").slice(1).join(" ");
        if(!MSG)return message.channel.send("please say something to search")
        const supEmbed = new Discord.MessageEmbed()
        .setColor('#ff1100')
        .setAuthor('youtube search', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/1200px-YouTube_social_red_circle_%282017%29.svg.png' )
        .setDescription(`search: ${MS}`)
        .addField('link', `[youtube search](https://www.youtube.com/results?search_query=${MSG})`)
        .setTimestamp()
        .setFooter('youtube plugin', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/1200px-YouTube_social_red_circle_%282017%29.svg.png');
        message.channel.send(supEmbed);
     }
    
}