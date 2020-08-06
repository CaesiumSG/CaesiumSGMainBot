const flip = require("flipout")

module.exports = {
    name: "flip",
    cooldown: 4,
    description: "upside text",
    usage:"[text]",
    aliases: "down",
    execute(message) {
      let MSG = message.content.split(" ").slice(1).join(" ");
      if(!MSG) return message.reply(flip('you need to put something'))
      message.channel.send(flip(`${MSG}`))

        
    }
}