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

	const queue = client.player.getQueue(message.guild.id);

	if (!client.player.getQueue(message.guild.id)) {
		return message.channel.send(
			`${client.emotes.error} - No songs currently playing !`,
		);
	}

	message.channel.send(
		`**Server queue - ${message.guild.name} ${client.emotes.queue} ${
			client.player.getQueue(message.guild.id).loopMode ? "(looped)" : ""
		}**\nCurrent : ${queue.playing.title} | ${queue.playing.author}\n\n` +
      (queue.tracks
      	.map((track, i) => {
      		return `**#${i + 1}** - ${track.title} | ${
      			track.author
      		} (requested by : ${track.requestedBy.username})`;
      	})
      	.slice(0, 5)
      	.join("\n") +
        `\n\n${
        	queue.tracks.length > 5 ?
        		`And **${queue.tracks.length - 5}** other songs...` :
        		`In the playlist **${queue.tracks.length}** song(s)...`
        }`),
	);
};
module.exports.help = {
	name: "queue",
	aliases: [],
	category: "Music",
	usage: "queue",
};
