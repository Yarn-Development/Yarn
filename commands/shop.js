const Discord = require('discord.js')
exports.execute = async (client, message, args) => {





    let embed = new Discord.MessageEmbed()
	.setDescription(
		"**Lifestyle Items**\n\n\
		Fresh Nikes: 600 [bt!buy nikes]\n\
		Car: 800 [bt!buy car]\n\
		Mansion: 1200 [bt!buy mansion]\n\n\
		**Useful items**\n\
		Fishing Rod: 50 [bt!buy fishing]")
    .setColor("#FFFFFF")
    message.channel.send(embed)

	}

exports.help = {
  name: "shop",
  aliases: ["s", 'store'],
  usage: `shop`
};
