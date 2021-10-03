exports.execute = async (client, message, args, data) => {
	if (!client.config.admins.includes(message.author.id)) return;
	if(args[0] === "user") {
		user = message.mentions.users.first();
		if (!user) {
			message.channel.send("Mention who you would like to be blacklisted.");
		}
		userData = client.db.u_fetch(user.id);
		userData.blacklisted.state = true;
		await userData.save().catch((err)=> console.log(`[DB] UserSave Error: ${err}`));
		message.channel.send(
			`${user} has been successfully blacklisted. They will not be able to use Yarn again, unless requested to be unblacklisted by the Yarn Administrative team.`,
		);
	}
	if (args[0] === "guild") {
		const guildId = args[1];
		if(guildId) {
			const guildData = client.db.g_fetch(guildId);
			guildData.blacklisted.state = true;
			await guildData.save().catch((err) => console.log(`[DB] GuildSave Error: ${err}`));
		}
		else {
			data.guild.blacklisted.state = true;
			await data.guild.save().catch((err) => console.log(`[DB] GuildSave Error: ${err}`));
		}
		message.channel.send(
			`${user} has been successfully blacklisted. They will not be able to use Yarn again, unless requested to be unblacklisted by the Yarn Administrative team.`,
		);
	}
};
exports.help = {
	name: "blacklist",
	aliases: ["bl"],
	usage: "blacklist <user>",
	category: "Owner",
};
