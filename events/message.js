module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;
    if (message.channel.id === client.config.countChannel) require("../counter")(message, client);
    client.prefix = client.db.fetch(`prefix_${message.guild.id}`) ? client.db.fetch(`prefix_${message.guild.id}`) : client.config.prefix;
    if (!message.content.toLowerCase().startsWith(client.prefix || message.content.toLowerCase().startsWith("@Yarn🧶#9140"))) return;
    let args = message.content.slice(client.prefix.length).trim().split(" ");
    let commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    if (!command) return;
    client.ecoAddUser = message.author.id;
    command.execute(client, message, args);
};
