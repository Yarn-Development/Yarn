exports.execute = async (client, message, args) => {
  if (!client.config.admins.includes(message.author.id)) {
    return message.channel.send(
        'This command is for owner (Aspekts) only. Sorry for any misdirection or confusion. ',
    );
  }
  if (!args || args.length < 1) {
    return message.reply('Must provide a command name to reload.');
  }
  const commandName = args[0];
  // Check if the command exists and is valid
  if (!client.commands.has(commandName)) {
    return message.reply('That command does not exist');
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(`The command ${commandName} has been reloaded`);
};
exports.help = {
  name: 'reload',
  aliases: [],
  usage: 'reload',
};
