const Discord = require("discord.js");

exports.execute = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.InlineReply(`Please join a voice channel!`);
  if (message.member.voice.channel) {
    client.discordTogether
      .createTogetherCode(message.member.voice.channelID, "youtube")
      .then(async (invite) => {
        return message.channel.send(
          `Your youtube together code is ${invite.code} ! **Click on the link** to get started!`
        );
      });
  }
};
exports.help = {
  name: "ytt",
  aliases: ["youtube-together"],
  usage: "ytt",
  category: "Fun",
};
