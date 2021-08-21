exports.execute = async (client, message, args) => {
  message.channel.startTyping();

  message.reply('Hi');
  message.channel.stopTyping();
};
exports.help = {
  name: 'zuxel',
  aliases: [],
  usage: 'idk',
};
