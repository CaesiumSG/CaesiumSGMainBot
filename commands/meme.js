const randomPuppy = require("random-puppy")
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "meme",
    cooldown: 3,
    description: "watch some good spicy meme",
    aliases: "memes",
    async execute(message) {
       const red = ["DaniDev", "dankmeme", "meme", "memes", "DaniDev", "dankmeme","meme", "memes", "JoJoMemes", "JoJoMemes","JoJoMemes","JoJoMemes", "PewdiepieSubmissions", "PewdiepieSubmissions",  "ShitPostCrusaders", "ShitPostCrusaders",  ]


        const sub = red[Math.floor(Math.random() * red.length)];
        
        const meme = await randomPuppy(sub)

        let memeEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`meme from **r/${sub}**`)
            .setURL(meme)
            .setImage(meme)
            .setTimestamp()
            .setFooter(`from r/${sub}`);

        message.channel.send(memeEmbed);

        
    }
}