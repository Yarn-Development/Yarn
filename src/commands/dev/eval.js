const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Beautify = require("beautify");

module.exports.execute = async (client, message, args, data) => {
	if (message.author.bot) return;


	if (message.author.id !== "294870523438170112") {
		return message.channel.send(":x: Forbidden: This Command is Owner-Only!");
	}

	if (!args[0]) {
		message.channel.send("You need to evaluate _**SOMETHING**_ Please!");
	}

	try {
		if (args.join(" ").toLowerCase().includes("token")) {
			return;
		}
		const find = "```";
		const re = new RegExp(find, "g");
		const toEval = args.join(" ");
		const strippedeval = toEval.replace(re, "");
		const evaluated = eval();
		const embed = new Discord.MessageEmbed()
			.setTitle("Eval")
			.addField(
				"ToEvaluate",
				`\`\`\`js\n${Beautify(strippedeval, { format: "js" })}\n\`\`\``,
			)
			.addField("Evaluated", evaluated)
			.addField("Type of:", typeof evaluated)
			.setTimestamp()
			.setFooter(`${message.author.tag}`, client.user.displayAvatarURL());
		message.channel.send({ embeds: [embed] });
	}
	catch (e) {
		console.log(e);
		const errorembed = new Discord.MessageEmbed()
			.addField(":x:", "Error!")
			.setDescription(e)
			.setTimestamp()
			.setFooter(`${message.author.tag}`, client.user.displayAvatarURL());
		message.channel.send({ embeds: [errorembed] });
	}
};
exports.help = {
	name: "eval",
	aliases: [],
	usage: "eval <code>",
	category: "Owner",
};
