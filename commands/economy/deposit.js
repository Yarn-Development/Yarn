const Discord = require('discord.js');
const ms = require('parse-ms');

exports.execute = async (client, message, args) => {
  const user = message.author;

  const member = await client.db.get(
      `money_${message.guild.id}_${user.id}.pocket`,
  );

  if (args[0] == 'all') {
    const money = await client.db.get(
        `money_${message.guild.id}_${user.id}.pocket`,
    );

    const embedbank = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription('You don\'t have any money to deposit');

    if (money === 0 || money === null) {
      return message.channel.send({embeds: [embedbank]});
    }

    await client.db.add(`money_${message.guild.id}_${user.id}.bank`, money);
    await client.db.subtract(
        `money_${message.guild.id}_${user.id}.pocket`,
        money,
    );
    const embed5 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`You have deposited ${args[0]} 🧶 into your bank`);
    message.channel.send({embeds: [embed5]});
  } else {
    const embed2 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`Specify an amount to deposit`);

    if (!args[0]) {
      return message.channel
          .send({embeds: [embed2]})
          .catch((err) => console.log(err));
    }
    const embed3 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`You can't deposit negative money`);

    if (message.content.includes('-')) {
      return message.channel.send({embeds: [embed3]});
    }
    const embed4 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`You don't have that much money`);

    if (member < args[0]) {
      return message.channel.send({embeds: [embed4]});
    }

    const embed5 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(
            `You have deposited ${parseInt(args[0])} 🧶 into your bank`,
        );

    await client.db.subtract(
        `money_${message.guild.id}_${user.id}.pocket`,
        parseInt(args[0]),
    );
    await client.db.add(
        `money_${message.guild.id}_${user.id}.bank`,
        parseInt(args[0]),
    );

    message.channel.send({embeds: [embed5]});
  }
};
module.exports.help = {
  name: 'deposit',
  description: 'Deposit some money to your local bank!',
  aliases: ['dep'],
  category: 'Economy',
  usage: 'deposit <amount>',
};
