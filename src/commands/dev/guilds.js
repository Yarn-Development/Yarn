const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args, data) => {
	if (!client.config.admins.includes(message.author.id)) return;

	const embed = new MessageEmbed();
	embed.setColor("RANDOM");
	embed.setTitle(`Servers that have ${client.user.username}`);
	client.guilds.cache.forEach((guild) => {
		embed.addField(
			`${guild.name}`,
			`ID: ${guild.id} \n Members: ${guild.memberCount}`,
		);
	});

	message.channel.send({ embeds: [embed] });
};

module.exports.help = {
	name: "guilds",
	aliases: ["guild"],
	usage: "guilds",
	category: "Owner",
	description: "List of servers",
};
