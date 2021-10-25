const Discord = require("discord.js");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
exports.execute = async (client, message, args, data) => {
	if (!message.member.voice.channel) {
		return message.channel.send(
			`${client.emotes.error} - You're not in a voice channel !`,
		);
	}

	if (
		message.guild.me.voice.channel &&
    message.member.voice.channel.id !== message.guild.me.voice.channel.id
	) {
		return message.channel.send(
			`${client.emotes.error} - You are not in the same voice channel !`,
		);
	}

	if (!client.player.getQueue(message.guild.id)) {
		return message.channel.send(
			`${client.emotes.error} - No music currently playing !`,
		);
	}
	const songName = args.join(" ");
	if (!songName) {
		return message.channel.send("Please specify a song name!");
	}

	const embed = new Discord.MessageEmbed()
		.setAuthor(`🎤 ${songName} lyrics`)
		.setColor("BLURPLE")
		.setFooter("If you enjoy this command do y!donate");

	try {
		const songNameFormated = songName
			.toLowerCase()
			.replace(
				/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g,
				"",
			)
			.split(" ")
			.join("%20");

		let res = await fetch(
			`https://www.musixmatch.com/search/${songNameFormated}`,
		);
		res = await res.text();
		let $ = await cheerio.load(res);
		const songLink = `https://musixmatch.com${$("h2[class=\"media-card-title\"]")
			.find("a")
			.attr("href")}`;

		res = await fetch(songLink);
		res = await res.text();
		$ = await cheerio.load(res);

		let lyrics = await $("p[class=\"mxm-lyrics__content \"]").text();

		if (lyrics.length > 2048) {
			lyrics =
        lyrics.substr(0, 2031) +
        "\n**And more...**" +
        " [" +
        "" +
        "]" +
        `https://www.musixmatch.com/search/${songName}`;
		}
		else if (!lyrics.length) {
			return message.channel.send(`No lyrics found for${songName}!`);
		}

		embed.setDescription(lyrics);
		message.channel.send({ embeds: [embed] });
	}
	catch (e) {
		message.channel.send(`No lyrics found for ${songName}!`);
	}
};
exports.help = {
	name: "lyrics",
	aliases: ["ly"],
	usage: "lyrics",
	category: "Music",
};
