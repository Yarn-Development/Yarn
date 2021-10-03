const Discord = require("discord.js");

// .issue
module.exports.execute = async (client, message, args, data) => {
	const embed = new Discord.MessageEmbed()
		.setTitle("REPORT AN ISSUE WITH THE BOT")
		.setDescription(
			"Unfortunately, nothing is perfect. Please report any abnormal activity from the bot and if any commands are unresponsive.",
		)
		.setThumbnail(
			"https://www.internetmatters.org/wp-content/uploads/2015/06/issue-cyber.png",
		)

		.addField("Github", "https://github.com/aspekts/AspektsAllin1Bot/issues")
		.addField(
			"Dm Aspekts#0001",
			"Possible the best way to get a response. You can use the ymisc!report command to dm me directly.",
		)
		.addField("Support Server", "https://discord.gg/HfUFThtgPq")
		.addField("Email", "aspekts@yarnbot.xyz");
	return message.channel.send({ embeds: [embed] }); // Sends issue message
};

module.exports.help = {
	name: "issue",
	aliases: [],
	category: "Misc",
	usage: "issue",
};
