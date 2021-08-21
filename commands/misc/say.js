const { MessageFlags } = require("discord.js");
var Filter = require("bad-words"),
  filter = new Filter({ placeHolder: "x" });

exports.execute = async (client, message, args) => {
  let msg;
  let textChannel = message.mentions.channels.first();
  message.delete();

  if (textChannel) {
    msg = args.slice(1).join(" ");
    textChannel.send(filter.clean(msg));
  } else {
    msg = args.join(" ");
    message.channel.send(filter.clean(msg));
  }
};
exports.help = {
  name: "say",
  aliases: [],
  usage: `say<message>`,
  description: "Say something as the bot!",
};
