const Discord = require('discord.js');

exports.execute = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_SERVER')) {
    return message.channel.send('You can\'t use that');
  }

  const user =
    message.mentions.users.first() || message.guild.members.cache.get(args[0]);

  if (!user) {
    return message.channel.send('Please specify a user, via mention or ID');
  }

  if (user.bot) return message.channel.send('You can\'t warn bots');

  if (message.author.id === user.id) {
    return message.channel.send('You can\'t warn yourself nitwit');
  }

  if (message.guild.owner.id === user.id) {
    return message.channel.send('You can\'t warn the server\'s owner');
  }

  let reason = args.slice(1).join(' ');

  if (!reason) reason = 'Unspecified';

  const warnings = client.db.get(`warnings_${message.guild.id}_${user.id}`);

  if (warnings === 3) {
    return message.channel.send(`${user} has already reached three warnings`);
  }

  if (warnings === null) {
    client.db.set(`warnings_${message.guild.id}_${user.id}`, 1);
    user.send(
        `You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``,
    );
    await message.channel.send(
        `**${user.username}** has been warned. Reason : ${reason} .`,
    );
  }

  if (warnings !== null) {
    client.db.add(`warnings_${message.guild.id}_${user.id}`, 1);
    user.send(
        `You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``,
    );
    await message.channel.send(
        `**${user.username}** has been warned.  They now have ${warnings} warning(s)`,
    );
  }
};
exports.help = {
  name: 'warn',
  aliases: [],
  category: 'Moderation',
  usage: 'warn @user',
};
