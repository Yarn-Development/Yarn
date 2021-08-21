const Discord = require('discord.js');
const ms = require('parse-ms');

exports.execute = async (client, message, args) => {
  const user = message.author;
  const timeout = 60000;

  let multiplier = await client.db.get(`multiplier_${message.guild.id}`);
  if (!multiplier) multiplier = 1;
  const amounta = Math.floor(Math.random() * 30) + 1;

  const amounts = amounta * multiplier;

  const beg = await client.db.get(`beg_${message.guild.id}_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    const time = ms(timeout - (Date.now() - beg));

    const timeEmbed = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(
            `You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `,
        );
    message.channel.send({embeds: [timeEmbed]});
  } else {
    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, amounts);
    await client.db.set(`beg_${message.guild.id}_${user.id}`, Date.now());

    message.channel.send(
        `You've begged on the streets and received ${amounts} 🧶`,
    );
  }
};
module.exports.help = {
  name: 'beg',
  description: 'Beg on the streets for some money!',
  category: 'Economy',
  aliases: ['b'],
  usage: 'beg',
};
