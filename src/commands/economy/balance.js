const Discord = require("discord.js");

exports.execute = async (client, message, args, data) => {
	const user = message.mentions.users.first() || message.author;
	client.users.cache.get(args[0]) ||
    (args.join(" ").toLowerCase(), message.guild) ||
    message.author;

	let bal = data.user.wallet;
	if (bal === null) bal = 0;

	let bank = data.user.bank;
	if (bank === null) bank = 0;

	const TotalMoney = bank + bal;

	const moneyEmbed = new Discord.MessageEmbed().setColor("#FFFFFF")
		.setDescription(`**${user}'s Balance**\n
  **Pocket:** ${bal} 🧶
  **Bank:** ${bank} 🧶
  **Total:** ${TotalMoney} 🧶`);
	message.channel.send({ embeds: [moneyEmbed] });
};
exports.help = {
	name: "bal",
	category: "Economy",
	aliases: ["money", "credits", "balance"],
	usage: "bal",
};
