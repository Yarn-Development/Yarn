(exports.execute = async (client, message, args, data) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) {
		return message.channel.send(
			"You don't have permission to run this command",
		);
	}

	if (!args[0]) {
		return message.channel.send(
			"You did not specify the time in seconds you wish to set this channel's slow mode too!",
		);
	}
	if (isNaN(args[0])) return message.channel.send("That is not a number!");

	message.channel.setRateLimitPerUser(args[0]);
	message.channel.send(`Set the slowmode of this channel to **${args[0]}**`);
}),
(module.exports.help = {
	name: "slowmode",
	aliases: ["sm"],
	category: "Moderation",
	usage: "slowmode <time>",
});
