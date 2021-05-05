const Discord = require('discord.js')



exports.execute = async (client, message, args) => {

    let embed = new Discord.MessageEmbed()
	.setDescription(
		"**VIP Ranks**\n\n\
		Bronze: 3500 Coins [ye!buy bronze]\n\n\
		**Lifestyle Items**\n\n\
		Fresh Nikes: 600 [ye!buy nikes]\n\
		Car: 800 [ye!buy car]\n\
		Mansion: 1200 [ye!buy mansion]\n\n\
		**Useful items**\n\
		Fishing Rod: 50 [ye!buy fishing]")
    .setColor("#FFFFFF")
    message.channel.send(embed)

	}
  module.exports.help = {
	
  
		name: "store",
		description: "Check the store!",
		category: "Economy",
    aliases:['shop'],
    usage:'store'
	}
