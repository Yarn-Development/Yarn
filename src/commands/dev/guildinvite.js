exports.execute = async (client, message, args, data) => {
	if (!client.config.admins.includes(message.author.id)) return;
	client.guilds.cache.forEach((guild) => {
		guild.channels.cache
			.filter((x) => x.type != "category")
			.random()
			.createInvite()
			.then((inv) => console.log(`${guild.name} | ${inv.url}`));
	});
};
exports.help = {
	name: "invs",
	aliases: ["guildinvites"],
	usage: "invs",
	category: "Owner",
};
