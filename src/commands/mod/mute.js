exports.execute = async (client, message, args, data) => {
	if (!message.member.hasPermission("MANAGE_ROLES")) {
		return message.channel.send(
			"You don't have permission to run this command",
		);
	}

	const user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

	if (!user) {
		message.channel.send("This user can't be found anywhere in this server");
	}

	if (user.id === message.author.id) {
		return message.channel.send(
			"You cannot mute yourself! Be smart, not stupid.",
		);
	}

	const role = message.guild.roles.cache.find((x) => x.name === "Muted");

	if (!role) {
		message.channel.send("Cannot find the muted role. Creating new one now.");
		mutedRole = await message.guild.roles.create({
			data: {
				name: "Muted",
				color: "#000000",
				permissions: [],
			},
		});
		message.guild.channels.cache.forEach(async (channel) => {
			await channel.overwritePermissions(mutedRole, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false,
			});
		});
		message.channel.send("Done! The role was created.");
	}
	let reason = args.slice(1).join(" ");
	if (reason === null) reason = "Unspecified";

	user.roles.add(role) || users.roles.add(mutedRole);

	await message.channel.send(
		`${user} has been muted for the following reason: ${reason}`,
	);

	user.send(
		`Hello there. You have been muted from ${message.guild.name} for the following reason: ${reason}`,
	);
};

exports.help = {
	name: "mute",
	aliases: ["m"],
	usage: "mute @user <time>",
};
