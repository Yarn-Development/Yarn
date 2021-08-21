const Discord = require('discord.js');
const ms = require('parse-ms');

exports.execute = async (client, message, args) => {
  const user = message.author;

  function isOdd(num) {
    if (num % 2 == 0) return false;
    else if (num % 2 == 1) return true;
  }

  let colour = args[0];

  let money = parseInt(args[1]);

  const moneydb = await client.db.get(
      `money_${message.guild.id}_${user.id}.pocket`,
  );

  const random = Math.floor(Math.random() * 37);

  const moneyhelp = new Discord.MessageEmbed()
      .setColor('#FFFFFF')
      .setDescription(
          ` Specify an amount to gamble | ye!roulette <color> <amount>`,
      );

  const moneymore = new Discord.MessageEmbed()
      .setColor('#FFFFFF')
      .setDescription(`You are betting more than you have`);

  const colorbad = new Discord.MessageEmbed()
      .setColor('#FFFFFF')
      .setDescription(`Specify a color | Red [1.5x] Black [2x] Green [15x]`);

  if (!colour) return message.channel.send({embeds: [colorbad]});
  colour = colour.toLowerCase();
  if (!money) return message.channel.send({embeds: [moneyhelp]});
  if (money > moneydb) return message.channel.send({embeds: [moneymore]});

  if (colour == 'b' || colour.includes('black')) colour = 0;
  else if (colour == 'r' || colour.includes('red')) colour = 1;
  else if (colour == 'g' || colour.includes('green')) colour = 2;
  else return message.channel.send({embeds: [colorbad]});

  if (random == 0 && colour == 2) {
    // Green
    money *= 15;
    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, money);
    const moneyEmbed1 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`:red_square: You won ${money} 🧶\n\nMultiplier: 15x`);
    message.channel.send({embeds: [moneyEmbed1]});
  } else if (isOdd(random) && colour == 1) {
    // Red
    money = parseInt(money * 1.5);
    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, money);
    const moneyEmbed2 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`:red_square: You won ${money} 🧶\n\nMultiplier: 1.5x`);
    message.channel.send({embeds: [moneyEmbed2]});
  } else if (!isOdd(random) && colour == 0) {
    // Black
    money = parseInt(money * 2);
    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, money);
    const moneyEmbed3 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(
            `:black_large_square: You won ${money} 🧶\n\nMultiplier: 2x`,
        );
    message.channel.send({embeds: [moneyEmbed3]});
  } else {
    // Wrong
    await client.db.subtract(
        `money_${message.guild.id}_${user.id}.pocket`,
        money,
    );
    const moneyEmbed4 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(` You lost ${money} 🧶\n\nMultiplier: 0x`);
    message.channel.send({embeds: [moneyEmbed4]});
  }
};
module.exports.help = {
  name: 'roulette',
  description: 'Play roulette!',
  aliases: ['roul'],
  category: 'Economy',
  usage: 'roulette <color> <amount>',
};
