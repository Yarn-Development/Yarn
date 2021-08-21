const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports.execute = async (client, message, args) => {
  let member = message.mentions.users.first() || message.author;

  let avatar = member.displayAvatarURL({
    size: 1024,
    dynamic: false,
    format: "png",
  });

  let image = await canvacord.Canvas.trigger(avatar);

  let triggered = new Discord.MessageAttachment(image, "triggered.gif");

  message.channel.send(triggered);
};
module.exports.help = {
  name: "trigger",
  aliases: ["tr"],
  usage: ["trigger"],
};
