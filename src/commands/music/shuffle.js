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

	const success = client.player.shuffle(message);

	if (success) {
		message.channel.send(
			`${client.emotes.success} - Queue shuffled **${
				client.player.getQueue(message.guild.id).tracks.length
			}** song(s) !`,
		);
	}
};
module.exports.help = {
	name: "shuffle",
	aliases: ["sh"],
	category: "Music",
	usage: "shuffle",
};
