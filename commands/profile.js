const Discord = require("discord.js");



exports.execute = async (client, message, args) => { 

  let user = message.mentions.users.first() || message.author
  client.users.cache.get(args[0]) ||
  (args.join(" ").toLowerCase(), message.guild) ||
  message.author;

  let bal = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`);
  if (bal === undefined) bal = 0;

  let bank = await client.db.fetch(`money_${message.guild.id}_${user.id}.bank`);
  if (bank === undefined) bank = 0;


  let shoes = await client.db.fetch(`nikes_${message.guild.id}_${user.id}`);
  if(shoes === null) shoes = 0;

  let newcar = await client.db.fetch(`car_${message.guild.id}_${user.id}`);
  if(newcar === null) newcar = 0;

  let newhouse = await client.db.fetch(`house_${message.guild.id}_${user.id}`);
  if(newhouse === null) newhouse = 0;

  let fish = await client.db.fetch(`fish_${message.guild.id}_${user.id}.fish`);

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**${user}'s Profile:**\n
  **Net Worth:** ${+bank + +bal}
  \n**Inventory**
  \n**Nikes:** ${shoes}
  **Cars:** ${newcar}
  **Mansions:** ${newhouse}
  **Fish & Stuff:** ${(fish === null) ? "No Fish." : (fish.join(" ").toString().length > 2000) 
  ? "You have too many fish! Please run the fishes command!" 
  : fish.join(", ")}`);

  message.channel.send(moneyEmbed);
	}
  module.exports.help =  {
		name: "profile",
		description: "Get the profile/Inventory of someone!",
		aliases: ["inventory", "inv"],
		category: "Economy",
    usage : 'profile @user'
	}

