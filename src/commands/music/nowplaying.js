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

	const track = client.player.nowPlaying(message);
	const filters = [];

	Object.keys(client.player.getQueue(message.guild.id).filters).forEach(
		(filterName) => client.player.getQueue(message.guild.id).filters[filterName],
	) ?
		filters.push(filterName) :
		false;

	message.channel.send({
		embeds: [
			{
				embed: {
					color: "RED",
					author: { name: track.title },

					fields: [
						{ name: "Channel", value: track.author, inline: true },
						{
							name: "Requested by",
							value: track.requestedBy.username,
							inline: true,
						},
						{
							name: "From playlist",
							value: track.fromPlaylist ? "Yes" : "No",
							inline: true,
						},

						{ name: "Views", value: track.views, inline: true },
						{ name: "Duration", value: track.duration, inline: true },
						{
							name: "Filters activated",
							value: filters.length + "/" + client.filters.length,
							inline: true,
						},

						{
							name: "Volume",
							value: client.player.getQueue(message.guild.id).volume,
							inline: true,
						},
						{
							name: "Repeat mode",
							value: client.player.getQueue(message.guild.id).repeatMode ? "Yes" : "No",
							inline: true,
						},
						{
							name: "Currently paused",
							value: client.player.getQueue(message.guild.id).paused ? "Yes" : "No",
							inline: true,
						},

						{
							name: "Progress bar",
							value: client.player.createProgressBar(message, {
								timecodes: true,
							}),
							inline: true,
						},
					],
					thumbnail: { url: track.thumbnail },
					timestamp: new Date(),
				},
			},
		],
	});
};
module.exports.help = {
	name: "nowplaying",
	aliases: ["np"],
	category: "Music",
	usage: "nowplaying",
};
