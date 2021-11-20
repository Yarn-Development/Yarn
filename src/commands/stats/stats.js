const Discord = require("discord.js");
const os = require("os");
const ms = require("ms");
const moment = require("moment");
const osu = require("node-os-utils");
module.exports.execute = async (client, message, args, data) => {
	const cpu = osu.cpu;
	cpu.usage().then((info) => {
		try {
		const stats = {
			title: `Statistics of ${client.user.username}`,
			color: 0x0099ff,
			description: "\n[NOTE] Experimental Command",
			thumbnail: client.user.displayAvatarURL({ dynamic:true }),
			timestamp: new Date(),
			fields: [
				{
					name: "Owner",
					value: "[Aspekts](https://twitch.tv/aspekts)",
					inline: false,
				},
				{
					name: "Server Count",
					value: `${client.guilds.cache.size.toString()}`,
					inline: true,
				},
				{
					name: "Users Count",
					value: `${client.users.cache.size.toString()}`,
					inline: true,
				},
				{
					name: "Channel Count",
					value: `${client.channels.cache.size.toString()}`,
					inline: true,
				},
				{ name: "Architecture", value: `${os.arch()}`, inline: true },
				{ name: "Platform", value: os.platform().toString(), inline: true },
				{ name: "Node Version", value: process.version, inline: true },
				{ name: "Shards", value: client.ws.shards.size.toString(), inline: true },
				{ name: "Uptime", value: ms(os.uptime()).toString(), inline: true },
				{ name: "CPU Usage", value: `${info}%`, inline: true },
				{ name: "Total RAM", value: `${((os.totalmem() / 1000000000).toFixed(2)).toString()}GB`, inline: true },
				{ name: "Used RAM", value: `${((os.freemem() / 1000000000).toFixed(2)).toString()}GB`, inline: true },
				{
					name: "Discord.js Version",
					value: Discord.version,
					inline: true,
				},
				{
					name: "Yarn Version",
					value: client.config.version,
					inline: true,
				},
			],
			footer: {
				text: message.author.tag,
				icon_url: message.author.displayAvatarURL(),
			},
		};
		message.channel.send({
			embeds: [
				stats,
			],
		});
	}
	catch {
		console.log(err)
	};
	});
};

module.exports.help = {
	name: "stats",
	aliases: ["info", "i"],
	usage: "stats",
};
