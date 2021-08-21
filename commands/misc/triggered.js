const canvacord = require('canvacord');
const Discord = require('discord.js');
module.exports.execute = async (client, message, args) => {
  const member = message.mentions.users.first() || message.author;

  const avatar = member.displayAvatarURL({
    size: 1024,
    dynamic: false,
    format: 'png',
  });

  const image = await canvacord.Canvas.trigger(avatar);

  const triggered = new Discord.MessageAttachment(image, 'triggered.gif');

  message.channel.send(triggered);
};
module.exports.help = {
  name: 'trigger',
  aliases: ['tr'],
  usage: ['trigger'],
};
