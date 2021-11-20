const Discord = require("discord.js");

exports.execute = async (client, message, args, data) => {
	const user = message.author;
	const author = data.user.wallet;
	switch (args[0]) {

	case "nikes":
		const Embedn = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setDescription(" You need 600 🧶 to purchase some Nikes");

		if (author < 600) return message.channel.send({ embeds: [Embedn] });

		const val = await client.eco.get(`nikes_${message.guild.id}_${user.id}`);
		await client.eco.set(`nikes_${message.guild.id}_${user.id}`, val + 1);

		const Embed3 = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setDescription(" Purchased Fresh Nikes For 600 🧶");

		author = author - 600;
		await data.user.save().catch((err)=> console.log(`[DB] UserSave Error: ${err}`));
		message.channel.send({ embeds: [Embed3] });
		break;

	case "car":
		const Embed4 = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setDescription(" You need 800 🧶 to purchase a new car");

		if (author < 800) return message.channel.send({ embeds: [Embed4] });

		const val1 = await client.eco.get(`car_${message.guild.id}_${user.id}`);
		await client.eco.set(`car_${message.guild.id}_${user.id}`, val1 + 1);

		const Embed5 = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setDescription(" Purchased a New Car For 800 🧶");

		author = author - 800;
		await data.user.save().catch((err)=> console.log(`[DB] UserSave Error: ${err}`));
		message.channel.send({ embeds: [Embed5] });
		break;

	case "fish":
	case "fishing":
		const Embed6 = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setDescription(" You need 50 🧶 to purchase a fishing rod");

		if (author < 50) return message.channel.send({ embeds: [Embed6] });
		const iffish = await client.eco.get(`fish_${message.guild.id}_${user.id}`);
		if (iffish !== null) {
			if (iffish.rod === 1) {
				return message.channel.send("You already have a fishing rod!");
			}
		}
		const val2 = await client.eco.get(`fish_${message.guild.id}_${user.id}`);
		await client.eco.set(`fish_${message.guild.id}_${user.id}.rod`, val2 + 1);
		await client.eco.set(`fish_${message.guild.id}_${user.id}.fish`, []);

		const Embed7 = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setDescription(" Purchased a Fishing rod For 50 🧶");

		author = author - 50;
		await data.user.save().catch((err)=> console.log(`[DB] UserSave Error: ${err}`));
		message.channel.send({ embeds: [Embed7] });
		break;

	case "mansion":
		const Embed8 = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setDescription(" You need 1200 🧶 to purchase a Mansion");

		if (author < 1200) return message.channel.send({ embeds: [Embed8] });

		const val3 = await client.eco.get(`house_${message.guild.id}_${user.id}`);
		await client.eco.set(`house_${message.guild.id}_${user.id}`, val3 + 1);

		const Embed9 = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setDescription(" Purchased a Mansion For 1200 🧶");

		author = author - 1200;
		await data.user.save().catch((err)=> console.log(`[DB] UserSave Error: ${err}`));
		message.channel.send({ embeds: [Embed9] });
		break;

	default:
		const embed3 = new Discord.MessageEmbed()
			.setColor("#FFFFFF")
			.setDescription(" Enter an item to buy");
		message.channel.send({ embeds: [Embed3] });
		break;
	}
};
module.exports.help = {
	name: "buy",
	description: "Buy something from the store!",
	category: "Economy",
	aliases: [],
	usage: "buy <item>",
};
