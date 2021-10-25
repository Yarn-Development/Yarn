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
	if (!queue) {
		return message.channel.send(
			`${client.emotes.error} - No music currently playing !`,
		);
	}

	if (queue.tracks.length <= 1) {
		return message.channel.send(
			`${client.emotes.error} - There is only one song in the queue.`,
		);
	}

	await queue.clear();

	message.channel.send(
		`${client.emotes.success} - The queue has just been **removed** !`,
	);
};
module.exports.help = {
	name: "clear-queue",
	aliases: ["cq","clear"],
	category: "Music",
	usage: "clear-queue",
};
