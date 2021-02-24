const { MessageFlags } = require("discord.js");
exports.execute = async (client, message, args) => {
  let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
    }
exports.help = {
    name: "say",
    aliases: [],
    usage: `say<message>`

}

