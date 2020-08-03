require('dotenv').config();
const { Client, MessageEmbed, DiscordAPIError } = require('discord.js');
const client = new Client();
const Discord = require('discord.js');

const config = require('./config.json');
const guilds = require('./guilds.json');
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

require('events').EventEmitter.defaultMaxListeners = 30;

client.login(process.env.token);
console.log("bot client has logged in")


client.on('message', message => { //modular selection
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.on('message', async message => { //verification
    
    

    if(message.author.bot) return;
    if(message.channel.id === '738036362418323496')
        await message.delete();
    if(message.content.toLowerCase() === 'c!verify' && message.channel.id === '738036362418323496')
    {   
        await message.delete().catch(err => console.log(err));
        const verirole = message.guild.roles.cache.get('738031724642041877');
        if(verirole) {
            try {await message.member.roles.add(verirole);
                console.log("Verified Role added!");
            }
            catch(err) {
                console.log(err);
            }

        }
        const unverirole = message.guild.roles.cache.get('738032280404230274')
        if(unverirole) {
            try {await message.member.roles.remove(unverirole);
                console.log.apply("unverified Role Removed!");
            }
            catch(err) {
                console.log(err);
            }
        }
        
        
        const channel = message.guild.channels.cache.get('736141999006154835')
        channel.send("<@" + message.author.id + "> Has Been Verified, Guys Please Welcome! <@" + message.author.id + ">");
        console.log("message has been sent")
    }
});

client.on('message', async message => { //Self Roles

    {

        if(message.author.bot) return;
        if(message.content.toLowerCase() === 'c!roles=orange' && message.channel.id === '739125733468930090')
        {   
            
            const orangerole = message.guild.roles.cache.get('739127756889129030');
            if(orangerole) {
                try {await message.member.roles.add(orangerole);
                    console.log("Orange Role added!");
                }
                catch(err) {
                    console.log(err);
                }
    
            }
            const channelrole = message.guild.channels.cache.get('739125733468930090')
            channelrole.send("<@" + message.author.id + "> Has Been given Orange Role");
        }
        if(message.content.toLowerCase() === 'c!roles=remove orange' && message.channel.id === '739125733468930090')
        {   
            
            const noorangerole = message.guild.roles.cache.get('739127756889129030');
            if(noorangerole) {
                try {await message.member.roles.remove(noorangerole);
                    console.log("Orange Role removed");
                }
                catch(err) {
                    console.log(err);
                }
    
            }
            const channelrole = message.guild.channels.cache.get('739125733468930090')
            channelrole.send("<@" + message.author.id + "> Has Been striped of Orange Role by the council");
        }

        if(message.author.bot) return; //green colour role
        if(message.content.toLowerCase() === 'c!roles=green' && message.channel.id === '739125733468930090')
        {   
            
            const greenrole = message.guild.roles.cache.get('739127853420904508');
            if(greenrole) {
                try {await message.member.roles.add(greenrole);
                    console.log("Green Role added!");
                }
                catch(err) {
                    console.log(err);
                }
    
            }
            const channelrole = message.guild.channels.cache.get('739125733468930090')
            channelrole.send("<@" + message.author.id + "> Has Been awarded green Role by the council");
        }
        if(message.content.toLowerCase() === 'c!roles=remove green' && message.channel.id === '739125733468930090')
        {   
            
            const nogreenrole = message.guild.roles.cache.get('739127853420904508');
            if(nogreenrole) {
                try {await message.member.roles.remove(nogreenrole);
                    console.log("green Role removed");
                }
                catch(err) {
                    console.log(err);
                }
    
            }
            const channelrole = message.guild.channels.cache.get('739125733468930090')
            channelrole.send("<@" + message.author.id + "> Has Been striped of Green Role by the council");
        }
        if(message.author.bot) return; //giveaway ping role
        if(message.content.toLowerCase() === 'c!roles=gping' && message.channel.id === '739125733468930090')
        {   
            
            const gpingrole = message.guild.roles.cache.get('739153857401192469');
            if(gpingrole) {
                try {await message.member.roles.add(gpingrole);
                    console.log("giveaway Ping added!");
                }
                catch(err) {
                    console.log(err);
                }
    
            }
            const channelrole = message.guild.channels.cache.get('739125733468930090')
            channelrole.send("<@" + message.author.id + "> Has Been awarded Giveaway Ping Role by the council");
        }
        if(message.content.toLowerCase() === 'c!roles=remove gping' && message.channel.id === '739125733468930090')
        {   
            
            const nogpingrole = message.guild.roles.cache.get('739153857401192469');
            if(nogpingrole) {
                try {await message.member.roles.remove(nogpingrole);
                    console.log("Giveaway ping removed");
                }
                catch(err) {
                    console.log(err);
                }
    
            }
            const channelrole = message.guild.channels.cache.get('739125733468930090')
            channelrole.send("<@" + message.author.id + "> Has Been striped of Giveaway Ping Role by the council");
        }
            
            
        
        



    }

});

client.on('guildMemberAdd', member => { //logging
    console.log(member.user.tag);
});



client.on('messageDelete', message => { //undelete
    if(!message.partial) {
        const partichannel = client.channels.cache.get('736141999006154835');
        if(partichannel) {
            const embed = new MessageEmbed()
                .setTitle('Some Gay Ass Tried To Delete Their Capitalist Message But Failed')
                .addField('Author', `${message.author.tag} (${"<@" + message.author.id + ">"})`, true)
                .addField('Channel', `${message.channel.name} (${message.channel.id})`, true)
                .setDescription(message.content)
                .setTimestamp();
            message.channel.send(embed);
            partichannel.send(embed);

        }
    }
});

client.on('messageReactionAdd', async (reaction, user) => { //starboard add shit
    const handleStarboard = async () => {
        const starboard = client.channels.cache.find(channel => channel.name.toLowerCase() === 'pinned-messages');
        const msgs = await starboard.messages.fetch({ limit: 100 });
        const existingMsg = msgs.find(msg => 
            msg.embeds.length === 1 ?
            (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(existingMsg) existingMsg.edit(`${reaction.count} - 🌟`);
        else {
            const embed = new MessageEmbed()
                .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
                .addField('Url', reaction.message.url)
                .setDescription(reaction.message.content)
                .setFooter(reaction.message.id + ' - ' + new Date(reaction.message.createdTimestamp));
            if(starboard)
                starboard.send('1🌟(Send Emote to star more)', embed);
        }
    }
    if(reaction.emoji.name === '🌟') {
        if(reaction.message.channel.name.toLowerCase() === 'pinned-messages') return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            handleStarboard();
        }
        else
            handleStarboard();
    }
});

client.on('messageReactionRemove', async (reaction, user) => { //starboard remove shit
    const handleStarboard = async () => {
        const starboard = client.channels.cache.find(channel => channel.name.toLowerCase() === 'pinned-messages');
        const msgs = await starboard.messages.fetch({ limit: 100 });
        const existingMsg = msgs.find(msg => 
            msg.embeds.length === 1 ? 
            (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(existingMsg) {
            if(reaction.count === 0)
                existingMsg.delete({ timeout: 2500 });
            else
                existingMsg.edit(`${reaction.count} - 🌟`)
        };
    }
    if(reaction.emoji.name === '🌟') {
        if(reaction.message.channel.name.toLowerCase() === 'pinned-messages') return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            handleStarboard();
        }
        else
            handleStarboard();
    }
});

client.on('message', async message => { //help page needs improvement
    if(message.content.toLowerCase() === 'c!help')
    {        
        {
            const embed = new MessageEmbed()
            .setTitle('CaesiumSGBot Help')
            .setColor('#0099ff')
            .setThumbnail("https://cdn.discordapp.com/avatars/573028065475690497/c1c6306f3ebb7999c0c292e292503c82.png?size=256")
            .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            .setAuthor('Liquid Caesium', "https://media.discordapp.net/attachments/683245625520685069/738963853949272156/737745506649899119.png")
            .setImage("https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFlag_of_Singapore&psig=AOvVaw3qgWMQb9lI9bzgmUskcVbj&ust=1596439549782000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNja9PP---oCFQAAAAAdAAAAABAD")
            .addField("This is a help page", "more stuff will be comming soon!")
            .addField("Command prefix for this bot is (c!) in small caps", "for example, c!verify")
            .addField("Current Implemented commands/features", "verification feature (Automatic/Manual), Undelete feature, Starring messages board, selfrole colours, gayrate, capitalism rate(caprate), time, ping, version info, changelog, games(rockpapersizzios, random number gen 1-1mil), server info, user info, am I gay, kick, ban, prune, coinflip")
            .addField("All commands", "c!verify c!roles=[insert role] c!gay c!caprate c!ping c!version c!changelog c!time c!amigay c!rps(rockpaperscissiozs idk how spell halp) c!sever c!user-info c!random(pick random number from 1-1 millon) c!coinflip" )
            .addField("Mod Commands", "c!prune(remove messages without triggerring undelete feature) c!kick c!ban c!raidmode=on/off c!verifyauto=on/off ")
            .addField("current available lists of roles", "Green, Orange, Giveaway Pings (much more comming in next update v1.5)")
            .addField("Command for adding roles", "c!roles=green/orange/gping")
            .addField("Command for removing roles", "c!roles=remove green/orange/gping")
            .addField("Future commands", "more colour roles, games, version, Raid Mode(auto ban)(gonna be implemented tmw), suggest, beg, loan")
            .addField("stupid bot sucks balls smh", "please read instructions before screwing yourselves up with the commands tyty. ALSO its c! IN NO CAPS")
            .setDescription("This is the help page for the highly esteemed CaesiumSGbot created by Liquid Caesium#7376")
            .setTimestamp();
            message.channel.send(embed);
    }
}
});


client.on('ready', () => { //bot status trying to figure out how this works also
    client.user.setStatus('dnd')
    client.user.setPresence({
        game: {
            name: 'with depression',
            type: "STREAMING",
            url: "https://www.twitch.tv/monstercat"
        }
        
    });
});
  

 
var prefix = "c!"

client.on('message', message => { //ping
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content.startsWith(prefix + 'ping')) {
        message.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: "Pong",
                value: "My Ping: " + Math.round(client.ws.ping) + ' ms' //client.ping has been moved to the WebSocketManager under client.ws.ping
          }
         ],
    }
    

    
    })
}})


client.on('message', message => { //version info
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content.startsWith(prefix + 'version')) {
        message.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: "version",
                value: "Version: v1.4"
                
                
                
          }
         ],
    }
    

    
    })
    }})
client.on('message', message => { //changelog
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content.startsWith(prefix + 'changelog')) {
        message.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: "version 1.4 changelog",
                value: "Big update! Mod Commands added (kick, ban, prune), 3 games added(coinflip, random int 1-1000000, rock paper sizzios). Added more useless features such as server info, user info, and am I gay?. Bug fixes."
                
                
          }
         ],
    }
    

    
    })
}})


client.on('message', message => { // Time
 
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content.startsWith(prefix + 'time')) {
        var date = new Date();
        message.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: "time",
                value: 'The time is ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "!"             
          }
         ],
    }  
    })
}})

client.on('message', message => { // Capitalism rating idk how yet
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content.startsWith(prefix + 'caprate')) {
        
        message.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: "Capitalism Rating",
                value: "you are " + getRandomInt(0, 100) + "% capitalistic"          
                    
          }
          
         ],
    }  
    })
}})

client.on('message', message => { // Gay rating idk how yet
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content.startsWith(prefix + 'gay')) {
        
        message.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: "Gay Rating",
                value: "you are " + getRandomInt(0, 100) + "% gay"          
                    
          }
          
         ],
    }  
    })
}})

client.on('message', message => { //group of stuff might just ignore this
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
      if (message.content.toLowerCase().startsWith("c!amigay")) { //The 8ball Message
              var msg1 = Array(5); 
              msg1[1] = "Yes";
              msg1[2] = "No";
              msg1[3] = "Maybe :wink:";
              msg1[4] = "Without a doubt LOL.";
              msg1[5] = "I Honestly Have No Idea :neutral_face:"
              msg1[6] = "Prob Not smh " 
              var x = getRandomInt(0, 20);
              if (x < 5){ 
               if (x < 3){
                  message.channel.send(msg1[1]);
              }
              else {
                     message.channel.send(msg1[3]);
              }
              }
              else if (x<= 9) {
                  if (x >= 7){
                  message.channel.send(msg1[2]); }
                      else{
                         message.channel.send(msg1[4]);
                      }
              } 
              else if (x <= 12 ) { 
                  message.channel.send(msg1[5]);
              }
              else {
                  message.channel.send(msg1[6])
              }
                
              }
              
      
                  if (message.content.toLowerCase().startsWith("c!random")) {
                      message.channel.send("The number is "+ getRandomInt(1, 1000000));
                  }
                if (message.content.toLowerCase().startsWith("c!coinflip")) { //The coinflip Message
              var msg2 = Array(2);
              msg2[1] = "Heads";
              msg2[2] = "Tails";
              var x = getRandomInt(0, 8);
              if (x < 4){
                  message.channel.send(msg2[1]);
              }
              else{
                  message.channel.send(msg2[2]);
              }
          }
              if (message.content.toLowerCase().startsWith("c!rps")) { //The rps Message
              var msg1 = Array(3);
              msg1[1] = "Rock :black_circle:";
              msg1[2] = "Paper :page_facing_up:";
              msg1[3] = "Scissors :scissors:"
              var x = getRandomInt(0, 9);
              if (x < 6){
               if (x < 3){
                  message.channel.send(msg1[1]);
              }
              else{
                     message.channel.send(msg1[3]);
              }
              }
              else{ 
                  message.channel.send(msg1[2]);
              }
            }
})

