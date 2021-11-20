const Discord = require("discord.js");
const ms = require("parse-ms");

exports.execute = async (client, message, args, data) => {
	const user = message.author;
	const timeout = 60000;

	const amounta = Math.floor(Math.random() * 30) + 1;
	const multiplier = 2;
	const amounts = amounta * multiplier;

	const beg = await client.eco.get(`beg_${message.guild.id}_${user.id}`);

	if (beg !== null && timeout - (Date.now() - beg) > 0) {
		const time = ms(timeout - (Date.now() - beg));

		const timeEmbed = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setDescription(
				`You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `,
			);
		message.channel.send({ embeds: [timeEmbed] });
	}
	else {
		data.user.wallet = data.user.wallet * amounts;
		await data.user.save().catch((error) => console.log(`[DB] UserSave Error: ${error}`));
		await client.eco.set(`beg_${message.guild.id}_${user.id}`, Date.now());

		message.channel.send(
			`You've begged on the streets and received ${amounts} 🧶`,
		);
	}
};
module.exports.help = {
	name: "beg",
	description: "Beg on the streets for some money!",
	category: "Economy",
	aliases: ["b"],
	usage: "beg",
};
