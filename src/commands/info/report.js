const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const myID = "294870523438170112";
const lockedList = ["userID1", "userID2"];
exports.execute = async (client, message, args, data) => {
	if (message.author.bot) return;

	const person = message.author.username;
	const userID = message.author.id;

	if (userID == lockedList) {
		message.channel.send(
			"***You have abused this feature before and as such have been put on a blacklist***",
		);
	}
	else {
		const bug = args.slice(0).join(" ");

		if (!bug) {
			message.channel.send(
				"You are attempting to send a bug report without listing a bug!",
			);
		}
		else {
			client.users.fetch(myID).then((user) => {
				user.send(
					`${person} of ${message.guild.name} (Guild ID: ${message.guild.id}, User ID: ${userID}) reported the bug: ${bug}`,
				);
			});
			message.channel.send(
				"**Your bug was reported. If you abuse this feature you will be put on a blacklist and will be prevented from using this command.**",
			);
		}
		client.channels.cache
			.get("829432191645646858")
			.send(
				`${person} of ${message.guild.name} (Guild ID: ${message.guild.id}, User ID: ${userID}) reported the bug: ${bug}`,
			);
	}
};

module.exports.help = {
	name: "report",
	aliases: ["bug", "bugreport"],
	usage: "report <issue>",
};
