const Discord = require('discord.js');
const ms = require('parse-ms');

exports.execute = async (client, message, args) => {
  const user = message.author;

  const timeout = 86400000;

  const daili = Math.floor(Math.random() * 200) + 1;
  let multiplier = await client.db.get(`multiplier_${message.guild.id}`);
  if (!multiplier) multiplier = 1;
  const dailies = daili * multiplier;

  const daily = await client.db.get(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    const time = ms(timeout - (Date.now() - daily));

    const timeEmbed = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(
            `You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `,
        );
    message.channel.send({embeds: [timeEmbed]});
  } else {
    const moneyEmbed = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`You've collected your daily reward of ${dailies} 🧶`);

    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, dailies);
    await client.db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

    message.channel.send({embeds: [moneyEmbed]});
  }
};
module.exports.help = {
  name: 'daily',
  description: 'Get your daily money!',
  category: 'Economy',
  aliases: ['d'],
  usage: 'daily',
};
