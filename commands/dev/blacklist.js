exports.execute = async (client, message, args) => {
  if (!client.config.admins.includes(message.author.id)) return;
  user = message.mentions.users.first();
  if (!user) {
    message.channel.send('Mention who you would like to be blacklisted.');
  }
  client.db.set(`bl_${user.user.tag}`, user.id);
  message.channel.send(
      `${user} has been successfully blacklisted. They will not be able to use Yarn again, unless requested to be unblacklisted by the Yarn Administrative team.`,
  );
};
exports.help = {
  name: 'blacklist',
  aliases: ['bl'],
  usage: 'blacklist <user>',
  category: 'Owner',
};
