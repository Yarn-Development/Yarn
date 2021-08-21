const Discord = require('discord.js');

exports.execute = async (client, message, args) => {
  if (!message.member.voice.channel) {
    return message.InlineReply(
        `Please join a voice channel to commence the chess game!`,
    );
  }
  if (message.member.voice.channel) {
    client.discordTogether
        .createTogetherCode(message.member.voice.channelID, 'chess')
        .then(async (invite) => {
          return message.channel.send(
              `Your chess together code is ${invite.code} ! **Click on the link** to get started!`,
          );
        });
  }
};
exports.help = {
  name: 'chess',
  aliases: ['chess-together'],
  usage: 'chess',
  category: 'Games',
};
