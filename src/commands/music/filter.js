exports.execute = async (client, message, args, data) => {
	const queue = client.player.getQueue(message.guild.id);

	if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ${client.emotes.error}`);

	const actualFilter = queue.getFiltersEnabled()[0];

	if (!args[0]) return message.channel.send(`Please specify a valid filter to enable or disable ${message.author}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter} (${client.config.app.px}filter ${actualFilter} to disable it).\n` : ""}`);

	const filters = [];

	queue.getFiltersEnabled().map(x => filters.push(x));
	queue.getFiltersDisabled().map(x => filters.push(x));

	const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

	if (!filter) return message.channel.send(`This filter doesn't exist ${message.author}... try again ? ${client.emotes.error}\n${actualFilter ? `Filter currently active ${actualFilter}.\n` : ""}List of available filters ${filters.map(x => `**${x}**`).join(", ")}.`);

	const filtersUpdated = {};

	filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

	await queue.setFilters(filtersUpdated);

	message.channel.send(`The filter ${filter} is now **${queue.getFiltersEnabled().includes(filter) ? "enabled" : "disabled"}** ${client.emotes.success}\n*Reminder the longer the music is, the longer this will take.*`);

};
module.exports.help = {
	name: "filter",
	aliases: [],
	category: "Music",
	usage: "filter [filter name]",
};
