const Discord = require("discord.js");

exports.execute = async (client, message, args, data) => {
	const member = message.mentions.users.first() || message.author;

	const avatar = member.displayAvatarURL({ size: 1024, dynamic: true });

	const embed = new Discord.MessageEmbed()
		.setTitle(`${member.username}'s avatar`)
		.setImage(avatar)
		.setColor("RANDOM");

	message.channel.send({ embeds: [embed] });
};
module.exports.help = {
	name: "avatar",
	aliases: ["av"],
	usage: "avatar",

	category: "Misc",
};
