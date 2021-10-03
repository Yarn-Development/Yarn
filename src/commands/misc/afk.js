module.exports.execute = async (client, message, args, data) => {
	const newNickname = `[AFK] ${message.member.displayName}`;

	message.member.setNickname(newNickname).catch((err) => {
		console.log(err);
	});

	let content = args.join(" ");
	await client.afk.set(`afk-${message.author.id}+${message.guild.id}`, [Date.now(), content]);
	if (!content) {
		content = "AFK";
		await client.afk.set(
			`afk-${message.author.id}+${message.guild.id}`,
			[Date.now(), content],
		);
	}

	message.channel.send(
		`I have set you as afk\n**Reason :** ${content}\nSee you later!`,
	);

};
module.exports.help = {
	name: "afk",
	aliases: [],
	category: "Misc",
	usage: "afk or ymisc!afk <Your afk message>",
};
