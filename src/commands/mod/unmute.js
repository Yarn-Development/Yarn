exports.execute = async (client, message, args, data) => {
	if (!message.member.permissions.has("MANAGE_ROLES")) {
		return message.channel.send("You are not allowed to run this command");
	}

	const user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

	const role = message.guild.roles.cache.find((x) => x.name === "Muted");

	if (user.roles.cache.has(role)) {
		return message.channel.send("This member isn't muted");
	}

	user.roles.remove(role);

	message.channel.send(`${user} has been unmuted`);
};
module.exports.help = {
	name: "unmute",
	aliases: [],
	category: "Moderation",
	usage: "unmute @user",
};
