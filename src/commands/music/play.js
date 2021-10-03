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

	if (!args[0]) {
		return message.channel.send(
			`${client.emotes.error} - Please indicate the title of a song or a url of a song!`,
		);
	}
	const query = args.join(" ");
	const searchResult = await client.player.search(query, {
		requestedBy: message.author,
	});
	if (!searchResult || !searchResult.tracks.length) {
		return message.reply("No results were found!");
	}
	const queue = await client.player.createQueue(message.guild, {
		metadata: message.channel,
	});
	try {
		if (!queue.connection) await queue.connect(message.member.voice.channel);
	}
	catch {
		void client.player.deleteQueue(message.guild.id);
		return void queue.metadata.send("Could not join your voice channel!");
	}

	await queue.metadata.send({
		content: `⏱ | Loading your ${
			searchResult.playlist ? "playlist" : "track"
		}...`,
	});
	searchResult.playlist ?
		queue.addTracks(searchResult.tracks) :
		queue.addTrack(searchResult.tracks[0]);
	if (!queue.playing) await queue.play();
};
module.exports.help = {
	name: "play",
	aliases: ["p"],
	category: "Music",
	utilisation: "{prefix}play [name/URL]",
};
