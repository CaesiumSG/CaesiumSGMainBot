require('dotenv').config();
const util = require('util');
const { Client, MessageEmbed, Permissions } = require('discord.js');
const client = new Client();
const Discord = require('discord.js');

const config = require('./config.json');
const guilds = require('./guilds.json');
const fs = require('fs');
client.commands = new Discord.Collection();
const clients = new Discord.Client();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

require('events').EventEmitter.defaultMaxListeners = 60;



client.login(process.env.token);
console.log("bot client has logged in")

client.on('ready', () => {
    client.user.setStatus('busy')
    client.user.setPresence({
        game: {
            name: 'ur mom',
            type: "STREAMING",
            url: "https://www.twitch.tv/DA_TRO11"
        }
    });
});

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
            .addField("Mod Commands", "c!prune(remove messages without triggerring undelete feature) c!kick c!ban c!raidmode=on/off c!verifyauto=on/off c!mod-everyone c!unmod-everyone c!create mod c!check-mod c!make-private c!can-kick c!create-private c!unprivate c!my-permissions c!lock-permissions c!role-premissions")
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
                value: "Version: v1.6"
                
                
                
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
                name: "version 1.6 changelog",
                value: " new mod commands c!mod-everyone c!unmod-everyone c!create mod c!check-mod c!make-private c!can-kick c!create-private c!unprivate c!my-permissions c!lock-permissions c!role-premissions. new poll command. some bugfixes."
                
                
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

const defaults = {
	timeout: 30,
	color: 2555834,
	triggers: {newPoll: 'c!newpoll', vote: 'c!vote', results: 'c!results'},
	appName: 'CaesiumSGBot-vote module'
};
var pollIndex = 0, polls = new Map();

// The corresponding emojis are used as unique keys for choices within each poll object
const emoji = {
	numbers: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
		.map((value, index) => [String(index), `:${value}:`]),
	letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
		.map(value => [value, `:regional_indicator_${value}:`]),
	yn: [['yes','**Yes**'],['no','**No**']],
	maybe: ['maybe','**Maybe**']
};

class Poll {
	constructor(opt) {
		var args = opt.arguments;
		this.name = opt.name;
		this.id = pollIndex;
			pollIndex++;

		this.choices = new Map();
		opt.choices.forEach((value, index) => {
			this.choices.set(emoji[opt.emojiType][index][0], {
				name: value,
				emoji: emoji[opt.emojiType][index][1],
				votes: 0
			});
		});
		if(args.maybe || args.idk) {
			this.choices.set(emoji.maybe[0], {
				name: 'I don\'t know.',
				emoji: emoji.maybe[1],
				votes: 0
			});
		}

		this.disallowEdits = args.lock || false;
		this.blind = args.blind || false;
		this.reactionVoting = args.reactions || args.rxn || false;
		this.allowMultipleVotes = this.reactionVoting || args.mult || args.multiple || false;
		this.restrictRole = args.role || false;
		this.dontCloseEarly = args.lo || args.leaveopen || args.dontcloseearly || false;
		this.timeout = opt.timeout || 30;
		this.color = opt.color;

		this.footNote = opt.notes || ' ';
		this.footNote += `${opt.notes ? '| ' : ''}This is Poll #${this.id}. It will expire in ${this.timeout} minutes.`;

		this.open = false;
		this.totalVotes = 0;

		this.voters = new Map();

		this.server = opt.server;

		this.timeCreated = new Date();
	}

	// Function to initiate timer
	startTimer() {
		this.open = true;
		setTimeout(function() {
			this.open = false;
		}.bind(this), this.timeout * 60 * 1000);
	}

	// Log votes (if the poll is open and unlocked/user hasn't voted)
	vote(key, user) {
		console.log(key, this.choices);
		if(this.open) {
			if(this.lock && this.voters.get(user.id)) {
				return {
					success: false,
					reason: 'lock',
					message: "Sorry, this is a locked poll (you can't edit your vote) and you've already voted."
				};
			} else if(!this.choices.get(key)) {
				return {
					success: false,
					reason: 'invalid',
					message: "That option is not a valid choice, so I can't log your vote. Try sending just the letter, number, or word that corresponds with the choice."
				};
			} else if(this.voters.get(user.id)) {
				// User has already voted, we need to change their vote
				let oldVoter = this.voters.get(user.id);
				this.choices.get(oldVoter.vote.choice).votes--;
				
				this.choices.get(key).votes++;
				this.voters.set(user.id, {
					user: user,
					vote: {
						time: new Date(),
						choice: key
					}
				});
				return {
					success: true,
					reason: '',
					message: `Great, I changed your vote to "${this.choices.get(key).name}"!`
				};

			} else {
				this.choices.get(key).votes++;
				// While we technically *could* use the user object as the key, that would be difficult to access. id should be unique.
				this.voters.set(user.id, {
					user: user,
					vote: {
						time: new Date(),
						choice: key
					}
				});
				return {
					success: true,
					reason: '',
					message: `Great, I logged your vote for "${this.choices.get(key).name}"!`
				};
			}
		} else {
			return {
				sucess: false,
				reason: 'timeout',
				message: "Sorry, this poll has timed out and can no longer be voted on."
			};
		}
	}

	close() {
		// Calling close() on a closed poll has no effect
		if(this.open) {
			this.open = false;
			return true;
		} else return false;
	}

	get chart() {
		// TODO generate charts of results
		return null;
	}
}

function generateDiscordEmbed(poll, type) {
	var embed = {}, choiceList = ``, resultsList = ``;
	poll.choices.forEach((choice, key) => {
		choiceList += `${choice.emoji} - ${choice.name} \n`;
		resultsList += `***${choice.votes} votes*** \n`;
	});

	switch(type) {
		case 'poll':
			embed = {
				title: `Poll ${poll.id}: ${poll.name}`,
				description: `To vote, reply with\`!vote choice\` within the next ${poll.timeout} minutes. For example, "!vote ${poll.choices.keys().next().value}". If multiple polls are open, you\'ll have to specify which one using its number and a pound sign: \`!vote #${poll.id} choice\`.`,
				color: poll.color,
				timestamp: poll.timeCreated,
				footer: {
					text: poll.footNote
				},
				author: {
					name: defaults.appName
				},
				fields: [{
					name: `Choices:`,
					value: choiceList
				}]
			};
			break;
		case 'results':
			//TODO: Order choices in results based on number of votes

			embed = {
				title: `*Results* - Poll ${poll.id}: ${poll.name}`,
				description: poll.open ? `This poll is still open, so these results may change.` : `This poll has closed and cannot be voted on.`,
				color: poll.color,
				timestamp: new Date(),
				footer: {
					text: `For more detailed results, use the \`--users\` flag.`
				},
				author: {
					name: defaults.appName
				},
				fields: [{
					name: `Choices:`,
					value: choiceList,
					inline: true
				}, {
					name: `Results:`,
					value: resultsList,
					inline: true
				}]
			};
			break;
		case 'detailResults':
			//TODO: Order choices in results based on number of votes

			embed = {
				title: `*Results* - Poll ${poll.id}: ${poll.name}`,
				description: poll.open ? `This poll is still open, so these results may change.` : `This poll has closed and cannot be voted on.`,
				color: poll.color,
				timestamp: new Date(),
				footer: {
					text: `We don't have detailed results capability yet.`
				},
				author: {
					name: defaults.appName
				},
				fields: [{
					name: `Choices:`,
					value: choiceList,
					inline: true
				}, {
					name: `Results:`,
					value: resultsList,
					inline: true
				}]
			};
	}

	return embed;
}

client.on('message', message => {
	if(message.content) {
		// Array with: anything in brackets, anything in quotes, anything separated by spaces (in that hierarchy)
		var args = message.content.trim().match(/(?:[^\s"\[]+|\[[^\[]*\]|"[^"]*")+/g);
		if(args[0].toLowerCase() === defaults.triggers.newPoll) {
			args.shift();
			// Do a little format checking to make sure (first argument, title, should be in quotes, and second argument, choices, should be in brackets)
			if(
				args.length > 1 &&
				args[0].charAt(0) === '"' &&
				args[0].charAt(args[0].length - 1) === '"' &&
				args[1].charAt(0) === '[' &&
				args[1].charAt(args[1].length - 1) === ']'
			) {
				
				// Title of the poll, without quotes
				var title = args.shift().slice(1,-1);
				// Array of poll choices, trimmed
				var choices = args.shift().slice(1,-1).split(',').map(Function.prototype.call, String.prototype.trim);
				var options = {
					name: title,
					choices: choices,
					emojiType: 'letters',
					timeout: defaults.timeout,
					color: defaults.color,
					arguments: {},
					role: false,
					notes: '',
					server: message.guild
				};

				// args should now just have the arguments
				args.forEach((arg, index) => {
					// If it's a new argument (starts with '--')
					if(arg.charAt(0) === '-' && arg.charAt(1) === '-') {

						// Remove '--'
						arg = arg.slice(2);

						if(arg === 'time' || arg === 'timeout') {
							let nextEl = args[index + 1];
							// If the next element is a nunber
							if(!isNaN(nextEl) && nextEl > 0) {
								options.timeout = +nextEl;
								args.slice(index + 1, 1);
							} else {
								let errorMessage = `A timeout argument was found, but the next item was not a valid number, so the poll defaulted to ${defaults.timeout} minutes. `;
								console.warn(errorMessage);
								options.notes += errorMessage;
							}

						} else if(arg === 'color' || arg === 'colour') {
							let nextEl = args[index + 1];
							// If the next element is a valid RGB int code
							if(!isNaN(nextEl) && +nextEl >= 0 && +nextEl <= 256*256*256) {
								options.color = +nextEl;
								args.slice(index + 1, 1);
							} else {
								let errorMessage = `A color argument was found, but the next item was not an RGB int code, so this was ignored.`;
								console.warn(errorMessage);
								options.notes += errorMessage;
							}

						} else if(arg === 'role') {
							let nextEl = args[index + 1];
							// If the next element is surrounded by double quotes
							if(args.find(el => el == 'rxn' || el === 'reactions')) {
								let errorMessage = `A "role" argument was found, but the reactions option was enabled, so voting can't be restricted to roles.`;
								console.warn(errorMessage);
								footNote += errorMessage;
							} else if(nextEl.charAt(0) === '"' && nextEl.charAt(nextEl.length - 1) === '"') {
								options.role = nextEl.slice(1, -1);
								args.slice(index + 1, 1);
							} else {
								let errorMessage = `A "role" argument was found, but the next item was not a string surrounded by "double quotes", so this was ignored. `;
								console.warn(errorMessage);
								options.notes += errorMessage;
							}

						} else if(arg === 'numbers' || arg === 'num') {
							if(choices.length <= emoji.numbers.length) {
								options.emojiType = 'numbers';
							} else {
								let errorMessage = `The poll was requested to be displayed with number icons, but there are only ten icons and ${choices.length} options were specified, so this was ignored. `;
								console.warn(errorMessage);
								options.notes += errorMessage;
							}

						} else if(arg === 'yesno' || arg === 'yn') {
							if(choices.length <= emoji.yn.length) {
								options.emojiType = 'yn';
							} else {
								let errorMessage = `The poll was requested to be displayed with yes/no icons, but too many (${choices.length}) options were specified, so this was ignored. `;
								console.warn(errorMessage);
								options.notes += errorMessage;
							}

						} else {
							options.arguments[arg] = true;
						}
					}
				});

				var newPoll = new Poll(options);
				newPoll.startTimer();
				polls.set(newPoll.id, newPoll);

				let embed = generateDiscordEmbed(newPoll, 'poll');
				message.channel.send('OK, here\'s your poll:', {embed});

			} else {
				console.error("Message format was invalid.");
				message.channel.send(`Poll requests must at minimum include a title (in "double quotes") and a set of options (in [square brackets], separated by commas). For example, try \`${defaults.triggers.newPoll} "What is your favorite shade of red?" [dark red, medium red, light red]\`.`);
			}

		} else if(args[0].toLowerCase() == defaults.triggers.vote) {
			args.shift();

			var activePollsInServer = [], voteResponse;
			polls.forEach(poll => {
				if(poll.open && poll.server == message.guild) {
					activePollsInServer.push(poll.id);
				}
			});

			if(activePollsInServer.length === 0) {
				voteResponse = `There aren't any active polls in this server right now, so you can't vote.`;

			} else if(args[0].charAt(0) !== '#') {
				// Only the vote was supplied
				if(activePollsInServer.length === 1) {
					voteResponse = polls.get(activePollsInServer[0]).vote(args[0].toLowerCase(), message.author).message;
				} else {
					// TODO dynamic examples
					voteResponse = 'Sorry, I don\'t know which poll to vote on. Please specify the poll id number using a pound sign and a number (ie \'!vote #1 A\') before your vote.';
				}

			} else {
				// The ID and vote were supplied
				let pollID = +(args[0].substr(1));

				if(activePollsInServer.includes(pollID)) {
					voteResponse = polls.get(pollID).vote(args[1].toLowerCase(), message.author).message;
				} else {
					// TODO dynamic examples
					voteResponse = 'Sorry, that\'s not a valid poll to vote on. Please specify the poll id number (ie \'!vote #1 A\') before your vote.';
				}
	 		}

	 		message.channel.send(voteResponse);

	 	} else if(args[0].toLowerCase() == defaults.triggers.results) {
	 		args.shift();

	 		var response;

	 		if(args[0].charAt(0) !== '#') { 
	 			message.channel.send('Sorry, I don\'t know which poll to get results for. Please specify the poll id number using a pound sign and number (ie \'!results #1\').');
	 		} else {
	 			let pollID = +(args[0].substr(1));

	 			if(polls.get(pollID)) {
	 				let embed;
	 				if(args[1] && (args[1].slice(2) === 'detailed' || args[1].slice(2) === 'users')) {
	 					embed = generateDiscordEmbed(polls.get(pollID), 'detailResults');
	 				} else {
	 					embed = generateDiscordEmbed(polls.get(pollID), 'results');
	 				}
	 				
	 				message.channel.send('OK, here\'s the results:', {embed});
	 			} else {
	 				message.channel.send('Sorry, that poll doesn\'t seem to exist.');
	 			}
	 		}

	 	} else if(args[0].toLowerCase() == 'c!pollping') {
	 		message.channel.send('PONG!'); //for testing connection
	 	}
	}
});



client.on('message', message => {
    if (!message.member.roles.cache.some(role => role.name === 'Mod' || role.name === 'Owner')) return;
    if (message.author.bot || !message.content.startsWith('c!')) return;
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;
   

	const botPerms = ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'MANAGE_ROLES', 'MANAGE_CHANNELS'];

	if (!message.guild.me.permissions.has(botPerms)) {
		return message.reply(`I need the permissions ${botPerms.join(', ')} for this function to work properly`);
	}

	if (message.content === 'c!mod-everyone') {
		const everyonePerms = new Permissions(message.guild.defaultRole.permissions);
		const newPerms = everyonePerms.add(['MANAGE_MESSAGES', 'KICK_MEMBERS']);

		message.guild.defaultRole.setPermissions(newPerms.bitfield)
			.then(() => message.channel.send('Added mod permissions to `@everyone`.'))
			.catch(console.error);
	} else if (message.content === 'c!unmod-everyone') {
		const everyonePerms = new Permissions(message.guild.defaultRole.permissions);
		const newPerms = everyonePerms.remove(['MANAGE_MESSAGES', 'KICK_MEMBERS']);

		message.guild.defaultRole.setPermissions(newPerms.bitfield)
			.then(() => message.channel.send('Removed mod permissions from `@everyone`.'))
			.catch(console.error);
	} else if (message.content === 'c!create-mod') {
		if (message.guild.roles.cache.some(role => role.name === 'Mod')) {
			return message.channel.send('A role with the name "Mod" already exists on this server.');
		}

		message.guild.roles.create({ data: { name: 'Mod', permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS'] } })
			.then(() => message.channel.send('Created Mod role.'))
			.catch(console.error);
	} else if (message.content === 'c!check-mod') {
		if (message.member.roles.cache.some(role => role.name === 'Mod' || role.name === 'Owner')) {
			return message.channel.send('You do have a role called Mod.');
		}

		message.channel.send('You don\'t have a role called Mod.');
	} else if (message.content === 'c!can-kick') {
		if (message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send('You can kick members.');
		}

		message.channel.send('You cannot kick members.');
	} else if (message.content === 'c!make-private') {
		if (!message.channel.permissionsFor(client.user).has('MANAGE_ROLES')) {
			return message.channel.send('Please make sure I have the `MANAGE_ROLES` permissions in this channel and retry.');
		}

		message.channel.overwritePermissions([
			{
				id: message.guild.id,
				deny: ['VIEW_CHANNEL'],
			},
			{
				id: client.user.id,
				allow: ['VIEW_CHANNEL'],
			},
			{
				id: message.author.id,
				allow: ['VIEW_CHANNEL'],
			},
		])
			.then(() => message.channel.send(`Made channel \`${message.channel.name}\` private.`))
            .catch(console.error);
    
	} else if (message.content === 'c!create-private') {
        
		    message.guild.channels.create('private', {
			    type: 'text', permissionOverwrites: [
				{
					id: message.guild.id,
					deny: ['VIEW_CHANNEL'],
				},
				{
					id: message.author.id,
					allow: ['VIEW_CHANNEL'],
				},
				{
					id: client.user.id,
					allow: ['VIEW_CHANNEL'],
                },
            

            ],
		})
			.then(() => message.channel.send('Created a private channel.'))
			.catch(console.error);
	} else if (message.content === 'c!unprivate') {
		if (!message.channel.permissionsFor(client.user).has('MANAGE_ROLES')) {
			return message.channel.send('Please make sure i have the permissions MANAGE_ROLES in this channel and retry.');
		}

		message.channel.permissionOverwrites.get(message.guild.id).delete()
			.then(() => message.channel.send(`Made channel ${message.channel.name} public.`))
			.catch(console.error);
	} else if (message.content === 'c!my-permissions') {
		const finalPermissions = message.channel.permissionsFor(message.member);

		message.channel.send(util.inspect(finalPermissions.serialize()), { code: 'js' });
	} else if (message.content === 'c!lock-permissions') {
		if (!message.channel.parent) {
			return message.channel.send('This channel is not placed under a category.');
		}

		if (!message.channel.permissionsFor(client.user).has('MANAGE_ROLES')) {
			return message.channel.send('Please make sure i have the permissions MANAGE_ROLES in this channel and retry.');
		}

		message.channel.lockPermissions()
			.then(() => {
				message.channel.send(`Synchronized overwrites of \`${message.channel.name}\` with \`${message.channel.parent.name}\`.`);
			})
			.catch(console.error);
	} else if (message.content === 'c!role-permissions') {
		const roleFinalPermissions = message.channel.permissionsFor(message.member.roles.highest);

		message.channel.send(util.inspect(roleFinalPermissions.serialize()), { code: 'js' });
	}
});


