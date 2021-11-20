const { QueueRepeatMode } = require("discord-player");
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

	if (args.join("").toLowerCase() === "queue") {
		if (queue.repeatMode === 1) return message.channel.send(`You must first disable the current music in the loop mode (${client.config.app.px}loop) ${message.author}... try again ? ❌`);

		const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

		return message.channel.send(success ? `Repeat mode **${queue.repeatMode === 0 ? "disabled" : "enabled"}** the whole queue will be repeated endlessly 🔁` : `Something went wrong ${message.author}... try again ? ❌`);
	}
	else {
		if (queue.repeatMode === 2) return message.channel.send(` Please disable the looped queue via \`${client.prefix}loop queue\`  before looping a specific song ${message.author}... try again ? ❌`);

		const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

		return message.channel.send(success ? `Repeat mode **${queue.repeatMode === 0 ? "disabled" : "enabled"}** the current music will be repeated endlessly (you can loop the queue with the <queue> option) 🔂` : `Something went wrong ${message.author}... try again ? ❌`);
	}

};
module.exports.help = {
	name: "loop",
	aliases: ["lp", "repeat"],
	category: "Music",
	usage: "loop",
};
