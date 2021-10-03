module.exports = async (client, message) => {
	if (!message.guild || message.author.bot) return;
	let guildData;
	const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}> `);
	if(message.content.match(mentionRegexPrefix)) {
		message.channel.send(`Hi there, my prefix in this server is \`${client.prefix}\``);
	}
	if(!message.guild.prefix) {
		guildData = client.db.g_fetch(message.guild.id);
		message.guild.prefix = guildData.prefix;
	}
	client.prefix = message.guild.prefix ? message.guild.prefix : client.config.prefix;
	if (!message.content.startsWith(client.prefix)) return;
	const args = message.content.slice(client.prefix.length).trim().split(" ");
	const commandName = args.shift().toLowerCase();
	const command =
    client.commands.get(commandName) ||
    client.commands.get(client.aliases.get(commandName));
	if (!command) return;

	if(!guildData) guildData = client.db.g_fetch(message.guild.id);
	const userData = client.db.u_fetch(message.author.id);
	const data = {};
	data.guild = guildData;
	data.user = userData;
	data.cmd = command;

	command.execute(client, message, args, data);
};
