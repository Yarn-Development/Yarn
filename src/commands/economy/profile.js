const Discord = require("discord.js");

exports.execute = async (client, message, args, data) => {
	const user = message.mentions.users.first() || message.author;

	let bal = await client.db.get(`money_${message.guild.id}_${user.id}.pocket`);
	if (bal === null) bal = 0;

	let bank = await client.db.get(`money_${message.guild.id}_${user.id}.bank`);
	if (bank === null) bank = 0;

	let vip = await client.db.get(`bronze_${message.guild.id}_${user.id}`);
	if (vip === null) vip = "None";
	if (vip === true) vip = "Bronze";

	let shoes = await client.db.get(`nikes_${message.guild.id}_${user.id}`);
	if (shoes === null) shoes = 0;

	let newcar = await client.db.get(`car_${message.guild.id}_${user.id}`);
	if (newcar === null) newcar = 0;

	let newhouse = await client.db.get(`house_${message.guild.id}_${user.id}`);
	if (newhouse === null) newhouse = 0;

	const fish = await client.db.get(`fish_${message.guild.id}_${user.id}.fish`);

	const moneyEmbed = new Discord.MessageEmbed().setColor("RANDOM")
		.setDescription(`**${user}'s Profile:**\n
  **Net Worth:** ${+bank + +bal} 🧶
  **VIP Rank:** ${vip}
  \n**Inventory**
  \n**Nikes:** ${shoes}
  **Cars:** ${newcar}
  **Mansions:** ${newhouse}
  **Fish & Stuff:** ${
	fish === null ?
		"No Fish." :
		fish.join(" ").toString().length > 2000 ?
			"You have too many fish! Please run the fishes command!" :
			fish.join(", ")
}`);

	message.channel.send({ embeds: [moneyEmbed] });
};
module.exports.help = {
	name: "profile",
	description: "Get the profile/Inventory of someone!",
	aliases: ["inventory", "inv"],
	category: "Economy",
	usage: "profile | profile @user",
};
