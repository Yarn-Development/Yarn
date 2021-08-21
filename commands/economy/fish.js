const Discord = require('discord.js');
const ms = require('parse-ms');

exports.execute = async (client, message, args) => {
  const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const user = message.author;
  const timeout = 60000;
  const fish = [
    'Yellow Fish :tropical_fish:',
    'Blowfish :blowfish:',
    'Blue Fish :fish:',
    'Coconut :coconut:',
    'Dolphin :dolphin:',
    'Lobster :lobster:',
    'Shark :shark:',
    'Crab :crab:',
    'Squid :squid:',
    'Whale :whale2:',
    'Shrimp :shrimp:',
    'Octopus :octopus:',
    'Duck :duck:',
    'Diamond :gem:! How fancy',
  ];

  const randn = rand(0, parseInt(fish.length));
  const randrod = rand(15, 30);

  const fishToWin = fish[randn];

  const fishdb = await client.db.get(`fish_${message.guild.id}_${user.id}`);
  const rod = await client.db.get(`fish_${message.guild.id}_${user.id}.rod`);
  const rodusage = await client.db.get(
      `fish_${message.guild.id}_${user.id}.rodusage`,
  );
  const wait = await client.db.get(`fish_${message.guild.id}_${user.id}.wait`);

  if (!rod) return message.channel.send(`You have to buy a fishing rod!`);

  if (rodusage) {
    if (fishdb.rodusage >= randrod) {
      await client.db.delete(`fish_${message.guild.id}_${user.id}.rod`);
      return message.reply('Your fishing rod has broken! Go buy a new one!');
    }
  }

  if (wait !== null && timeout - (Date.now() - wait) > 0) {
    const time = ms(timeout - (Date.now() - wait));

    message.channel.send(
        `You have already fished!\nFish it again in ${time.seconds}s`,
    );
  } else {
    message.channel.send(`You've fished and gotten a ${fishToWin}`);

    await client.db.push(`fish_${message.guild.id}_${user.id}.fish`, fishToWin);
    await client.db.set(`fish_${message.guild.id}_${user.id}.wait`, Date.now());
    await client.db.add(`fish_${message.guild.id}_${user.id}.rodusage`, 1);
  }
};
module.exports.help = {
  name: 'fish',
  description: 'Fish some fish.',
  category: 'Economy',
  aliases: [],
  usage: 'fish',
};
