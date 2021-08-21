const Meme = require('memer-api');

const Discord = require('discord.js');
exports.execute = async (client, message, args) => {
  const memer = new Meme('qpveZVDTqOA');
  const user1 = message.author;

  const avatar = user1.displayAvatarURL({dynamic: false});

  const text = args.join(' ');

  if (!text) return message.reply(`Please provide a text.`);

  const username = user1.username;
  memer.youtube(avatar, username, text).then((image) => {
    const attachment = new Discord.MessageAttachment(image, 'ytcomment.png');
    message.channel.send(attachment);
  });
};
exports.help = {
  name: 'youtube',
  aliases: [],
  usage: 'youtube <text>',
};
