const slotItems = [
	":grape:",
	":watermelon:",
	"🍊",
	":apple:",
	":slot_machine:",
	":strawberry:",
	":cherries:",
];
const Discord = require("discord.js");

exports.execute = async (client, message, args, data) => {
	const user = message.author;

	const moneydb = await client.db.get(
		`money_${message.guild.id}_${user.id}.pocket`,
	);

	let money = parseInt(args[0]);

	let win = false;

	const moneymore = new Discord.MessageEmbed()
		.setColor("#FFFFFF")
		.setDescription(" You are betting more than you have");

	const moneyhelp = new Discord.MessageEmbed()
		.setColor("#FFFFFF")
		.setDescription("Specify an amount");

	if (!money) return message.channel.send({ embeds: [moneyhelp] });
	if (money > moneydb) return message.channel.send({ embeds: [moneymore] });

	const number = [];
	for (i = 0; i < 3; i++) {
		number[i] = Math.floor(Math.random() * slotItems.length);
	}

	if (number[0] == number[1] && number[1] == number[2]) {
		money *= 9;
		win = true;
	}
	else if (
		number[0] == number[1] ||
    number[0] == number[2] ||
    number[1] == number[2]
	) {
		money *= 2;
		win = true;
	}
	if (win) {
		const slotsEmbed1 = new Discord.MessageEmbed()
			.setDescription(
				`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
					slotItems[number[2]]
				}\n\nYou won ${money} 🧶`,
			)
			.setColor("#FFFFFF");
		message.channel.send({ embeds: [slotsEmbed1] });
		await client.db.add(`money_${message.guild.id}_${user.id}.pocket`, money);
	}
	else {
		const slotsEmbed = new Discord.MessageEmbed()
			.setDescription(
				`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
					slotItems[number[2]]
				}\n\nYou lost ${money} 🧶`,
			)
			.setColor("#FFFFFF");
		message.channel.send({ embeds: [slotsEmbed] });
		await client.db.subtract(
			`money_${message.guild.id}_${user.id}.pocket`,
			money,
		);
	}
};
module.exports.help = {
	name: "slots",
	description: "Play slots!",
	aliases: ["sl"],
	category: "Economy",
	usage: "slots <amount>",
};
