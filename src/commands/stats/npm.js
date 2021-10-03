const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
exports.execute = async (client, message, args, data) => {
	const npm = args[0];
	if (!npm) {
		return message.channel.send(
			"**:point_right: Please make sure to mention a npm.**",
		);
	}
	let response;
	try {
		response = await fetch("https://api.npms.io/v2/search?q=" + args[0]).then(
			(res) => res.json(),
		);
	}
	catch (err) {
		return message.reply("**:no_entry_sign: I think an error occured...**");
	}
	try {
		const pkg = response.results[0].package;
		const npmbed = new MessageEmbed()
			.setTitle(pkg.name)
			.setColor("#ED5E5E")
			.setURL(pkg.links.npm)
			.setThumbnail(
				"https://images-ext-1.discordapp.net/external/JsiJqfRfsvrh5IsOkIF_WmOd0_qSnf8lY9Wu9mRUJYI/https/images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png",
			)
			.setDescription(pkg.description)
			.addField("Creator:", pkg.author ? pkg.author.name : "None")
			.addField("Package Version:", pkg.version)
			.addField(
				"Github Repository:",
				pkg.links.repository ? pkg.links.repository : "None",
			)
			.addField(
				"Package Maintainers:",
				pkg.maintainers ?
					pkg.maintainers.map((e) => e.username).join(", ") :
					"None",
			)
			.addField("Keywords:", pkg.keywords ? pkg.keywords.join(", ") : "None")
			.setTimestamp();
		message.channel.send({ embeds: [npmbed] });
	}
	catch (err) {
		console.warn(err);
		message.channel.send("**I could not find such package in npm...** ");
	}
};
exports.help = {
	name: "npm",
	aliases: [],
	usage: "npm <package>",
	category: "Statistics",
};
