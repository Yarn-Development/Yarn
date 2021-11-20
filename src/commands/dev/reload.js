exports.execute = async (client, message, args, data) => {
	if (!client.config.admins.includes(message.author.id)) {
		return message.channel.send(
			"This command is for owner (Aspekts) only. Sorry for any misdirection or confusion. ",
		);
	}
	if (!args || args.length < 2) {
		return message.reply("Must provide a  directory and command name to reload.");
	}
	const commandName = args[1];
	const dir = args[0];
	// Check if the command exists and is valid
	if (!client.commands.has(commandName)) {
		return message.reply("That command does not exist");
	}
	// the path is relative to the *current folder*, so just ./filename.js
	delete require.cache[require.resolve(`../${dir}/${commandName}.js`)];
	// We also need to delete and reload the command from the client.commands Enmap
	client.commands.delete(commandName);
	const props = require(`../${dir}/${commandName}.js`);
	client.commands.set(commandName, props);
	message.reply(`The command ${commandName} has been reloaded`);
};
exports.help = {
	name: "reload",
	aliases: [],
	usage: "reload",
};
