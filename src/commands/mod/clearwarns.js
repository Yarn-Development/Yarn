const warnings = require("./warns");

exports.execute = async (client, message, args, data) => {
	if (!message.member.permissions.has("MANAGE_SERVER")) {
		return message.channel.send("You can't use that.");
	}

	const user =
    message.mentions.users.first() || message.guild.members.cache.get(args[0]);

	if (!user) {
		return message.channel.send("Please specify a user, via mention or ID");
	}

	if (user.bot) return message.channel.send("You can't warn bots");

	if (user.id === message.author.id) {
		return message.channel.send("You can't clear your own warnings");
	}

	if (warnings === null) {
		return message.channel.send(`**${user.username} has no warnings**`);
	}

	db.delete(`warnings_${message.guild.id}_${user.id}`);

	message.channel.send("Success!");
};
exports.help = {
	name: "clearwarns",
	category: "Moderation",
	aliases: ["deletewarns"],
	usage: "clearwarns @user",
};
