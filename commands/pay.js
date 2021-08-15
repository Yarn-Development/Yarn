const Discord = require("discord.js");
const ms = require("parse-ms");



exports.execute = async(client, message, args) => {

  let user = message.mentions.members.first()

  let member = await client.db.fetch(`money_${message.guild.id}_${message.author.id}.pocket`);

  let embed1 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Mention someone to pay`);

  if (!user) {
      return message.channel.send({embeds:[embed1]})
  }
  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Specify an amount to pay`);
  
  if (!parseInt(args[1])) {
      return message.channel.send({embeds:[embed2]})
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You can't pay someone negative money`);

  if (message.content.includes('-')) { 
      return message.channel.send({embeds:[embed3]})
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You don't have that much money`);

  if (member < parseInt(args[1])) {
      return message.channel.send({embeds:[embed4]})
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You have payed ${user.user.username} ${parseInt(args[1])} 🧶`);
  
  await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, parseInt(args[1]));
  await client.db.subtract(`money_${message.guild.id}_${message.author.id}.pocket`, parseInt(args[1]));

  message.channel.send({embeds:[embed5]});
  

	}
  module.exports.help = {
	 
		name: "pay",
		description: "Pay someone!",
		category: "Economy",
    usage:'pay @user',
    aliases:['p']
	}



