const { Permissions } = require("discord.js");
exports.execute = async (client, message, args, data) => {
	if (!message.member.permissions.has(Permissions.FLAGS.MANGE_MESSAGES)) {
		message.reply(
			"You do not have permissions to change the prefix. Please contact a moderator or developer to do so.",
		);
	}
	if(args.join(" ") === data.guild.prefix) {
		message.channel.send("This prefix is already set to this guild!");
	}
	if (args.join(" ") === client.config.prefix || !args[0]) {
		data.guild.prefix = "y!";
		await data.guild.save().catch((err) => console.log("[DB] GuildData Save Error: ", err));
		await message.channel.send("Prefix reset to `y!`");
	}
	else {
		data.guild.prefix = args.join(" ");
		await data.guild.save().catch((err) => console.log("[DB] GuildData Save Error: ", err));
		await message.channel.send(
			`Updated bot prefix. The new prefix is now \`${args.join(" ")}\``,
		);
	}
};

exports.help = {
	name: "prefix",
	aliases: ["setprefix"],
	usage: "prefix",
};
