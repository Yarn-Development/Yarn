const Discord = require('discord.js');
const ms = require('parse-ms');

exports.execute = async (client, message, args) => {
  const user = message.author;

  const member = await client.db.get(
      `money_${message.guild.id}_${user.id}.pocket`,
  );

  const member2 = await client.db.get(
      `money_${message.guild.id}_${user.id}.bank`,
  );

  if (args[0] == 'all') {
    const money = await client.db.get(
        `money_${message.guild.id}_${user.id}.bank`,
    );

    await client.db.subtract(
        `money_${message.guild.id}_${user.id}.bank`,
        money,
    );
    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, money);

    const embed5 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(
            `You have withdrawn ${args[0]} of your 🧶 from your bank`,
        );
    message.channel.send({embeds: [embed5]});
  } else {
    const embed2 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`Specify an amount to withdraw`);

    if (!args[0]) {
      return message.channel.send({embeds: [embed2]});
    }
    const embed3 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`You can't withdraw negative money`);

    if (message.content.includes('-')) {
      return message.channel.send({embeds: [embed3]});
    }
    const embed4 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`You don't have that much money in the bank`);

    if (member2 < args[0]) {
      return message.channel.send({embeds: [embed4]});
    }

    const embed5 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`You have withdrawn ${args[0]} 🧶 from your bank`);

    message.channel.send({embeds: [embed5]});
    await client.db.subtract(
        `money_${message.guild.id}_${user.id}.bank`,
        parseInt(args[0]),
    );
    await client.db.add(
        `money_${message.guild.id}_${user.id}.pocket`,
        parseInt(args[0]),
    );
  }
};
module.exports.help = {
  name: 'withdraw',
  description: 'Withdraw your money from the bank!',
  category: 'Economy',
  aliases: ['with'],
  usage: 'withdraw <amount>',
};
