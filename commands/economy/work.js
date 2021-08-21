const Discord = require('discord.js');
const ms = require('parse-ms');

exports.execute = async (client, message, args) => {
  const user = message.author;

  const author = await client.db.get(`work_${message.guild.id}_${user.id}`);

  const timeout = 300000;

  if (author !== null && timeout - (Date.now() - author) > 0) {
    const time = ms(timeout - (Date.now() - author));

    const timeEmbed = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(
            `You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `,
        );
    message.channel.send({embeds: [timeEmbed]});
  } else {
    const replies = [
      'Programmer',
      'Builder',
      'Waiter',
      'Busboy',
      'Chief',
      'Mechanic',
    ];

    const result = Math.floor(Math.random() * replies.length);
    const amounta = Math.floor(Math.random() * 80) + 1;
    let multiplier = await client.db.get(`multiplier_${message.guild.id}`);
    if (!multiplier) multiplier = 1;
    const amount = amounta * multiplier;

    const embed1 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(
            `You worked as a ${replies[result]} and earned ${amount} 🧶`,
        );
    message.channel.send({embeds: [embed1]});

    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, amount);
    await client.db.set(`work_${message.guild.id}_${user.id}`, Date.now());
  }
};
module.exports.help = {
  name: 'work',
  description: 'Work to get some money!',
  category: 'Economy',
  aliases: ['w'],
  usage: 'work',
};
