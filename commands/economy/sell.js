const Discord = require('discord.js');

exports.execute = async (client, message, args) => {
  const user = message.author;

  if (args[0].toLowerCase() == 'nikes') {
    const Embed2 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`You don't have Nikes to sell`);

    const nikeses = await client.db.get(`nikes_${message.guild.id}_${user.id}`);

    if (nikeses < 1) return message.channel.send({embeds: [Embed2]});

    await client.db.get(`nikes_${message.guild.id}_${user.id}`);
    await client.db.subtract(`nikes_${message.guild.id}_${user.id}`, 1);

    const Embed3 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`Sold Fresh Nikes For 600 🧶`);

    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, 600);
    message.channel.send({embeds: [Embed3]});
  } else if (args[0].toLowerCase() == 'car') {
    const Embed2 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(` You don't have a Car to sell`);

    const cars = await client.db.get(`car_${message.guild.id}_${user.id}`);

    if (cars < 1) return message.channel.send({embeds: [Embed2]});

    await client.db.get(`car_${message.guild.id}_${user.id}`);
    await client.db.subtract(`car_${message.guild.id}_${user.id}`, 1);

    const Embed3 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`Sold a Car For 800 🧶`);

    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, 800);
    message.channel.send({embeds: [Embed3]});
  } else if (args[0].toLowerCase() == 'mansion') {
    const Embed2 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(` You don't have a Mansion to sell`);

    const houses = await client.db.get(`house_${message.guild.id}_${user.id}`);

    if (houses < 1) return message.channel.send({embeds: [Embed2]});

    await client.db.get(`house_${message.guild.id}_${user.id}`);
    await client.db.subtract(`house_${message.guild.id}_${user.id}`, 1);

    const Embed3 = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setDescription(`Sold a Mansion For 1200 🧶`);

    await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, 1200);
    message.channel.send({embeds: [Embed3]});
  }
};
module.exports.help = {
  name: 'sell',
  description: 'Sell something you dont use/want!',
  category: 'Economy',
  aliases: [],
  usage: 'sell <item>',
};
