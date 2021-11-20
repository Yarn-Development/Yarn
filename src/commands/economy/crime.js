const Discord = require("discord.js");
const ms_2 = require("parse-ms");

exports.execute = async (client, message, args, data) => {
	const user = message.author;

	const timeout = 60000;

	const author = data.user.wallet;
	const multiplier = 1;
	const randoma = Math.floor(Math.random() * 200) + 1;
	const random = randoma * multiplier;

	if (author < 250) {
		return message.channel.send("You need at least 250🧶 to commit a crime");
	}

	const crime = await client.eco.get(`crime_${message.author.id}`);

	if (crime !== null && timeout - (Date.now() - crime) > 0) {
		const time = ms_2(timeout - (Date.now() - crime));

		message.channel.send(
			`You already commited a crime! Try again in ${time.seconds} seconds!`,
		);
	}
	else {
		const result = ["WINWIN", "LOOSELOOSE"];

		const awnser = result[Math.floor(Math.random() * result.length)];

		if (awnser === "LOOSELOOSE") {
			message.channel.send(
				"You were caught and had to pay `$250` to stay out of jail",
			);

			await client.eco.subtract(
				`money_${message.guild.id}_${user.id}.pocket`,
				250,
			);

			await client.eco.set(`crime_${message.author.id}`, Date.now());
		}
		else {
			const embed = new Discord.MessageEmbed()
				.setAuthor(message.author.tag, message.author.avatarURL())
				.setTitle("You Have Just Commited A Crime!")
				.addField("Amount Robbed:", random + "🧶")
				.setColor("RANDOM")
				.setTimestamp();
			message.channel.send({ embeds: [embed] });
			const val = client.eco.get(`crimecommitted_${user.id}`);
			await client.eco.add(`crimecommited_${user.id}`, val + 1);
			author = author + random;
			await data.user.save().catch((err)=> console.log(`[DB] UserSave Error: ${err}`));
			await client.eco.set(`crime_${message.author.id}`, Date.now());
		}
	}
};
module.exports.help = {
	name: "crime",
	description: "Commit a crime, but is it worth it?",
	category: "Economy",
	aliases: ["c"],
	usage: "crime",
};
