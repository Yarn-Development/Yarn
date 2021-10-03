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

	const queue = client.player.getQueue(message.guild.id, {
		metadata: message.channel,
	});
	if (!queue) {
		return message.channel.send(
			`${client.emotes.error} - No music currently playing !`,
		);
	}

	const filtersStatuses = [[], []];

	client.filters.forEach((filterName) => {
		const array =
      filtersStatuses[0].length > filtersStatuses[1].length ?
      	filtersStatuses[1] :
      	filtersStatuses[0];
		array.push(
			filterName.charAt(0).toUpperCase() +
        filterName.slice(1) +
        " : " +
        (client.player.getQueue(message).filters[filterName] ?
        	client.emotes.success :
        	client.emotes.off),
		);
	});

	message.channel.send({
		embeds: [
			{
				embed: {
					color: "ORANGE",

					fields: [
						{
							name: "Filters",
							value: filtersStatuses[0].join("\n"),
							inline: true,
						},
						{
							name: "** **",
							value: filtersStatuses[1].join("\n"),
							inline: true,
						},
					],
					timestamp: new Date(),
					description: `List of all filters enabled or disabled.\nUse \`${client.prefix}<filter>\` to add a filter to a song.`,
				},
			},
		],
	});
};
module.exports.help = {
	name: "w-filters",
	aliases: ["filters"],
	category: "Music",
	usage: "w-filters",
};
