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

	if (!client.player.getQueue(message.guild.id).paused) {
		return message.channel.send(
			`${client.emotes.error} - The music is already playing !`,
		);
	}

	const success = client.player.resume(message);

	if (success) {
		message.channel.send(
			`${client.emotes.success} - Song ${
				client.player.getQueue(message.guild.id).playing.title
			} resumed !`,
		);
	}
};
module.exports.help = {
	name: "resume",
	aliases: [],
	category: "Music",
	usage: "resume",
};
