module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;

    if (message.channel.id === client.config.countChannel) require("../counter")(message, client);
    client.prefix = await client.db.get(`prefix_${message.guild.id}`) ?await client.db.get(`prefix_${message.guild.id}`) : client.config.prefix;
    if (/<@!814174226037866537>|<@814174226037866537>/.test(message.content)) {
         console.log('Works!')
         message.channel.send(`Hello there! I'm Yarn, the All in 1 Discord Bot! My prefix in this server is ${client.prefix}`);
    };
    if (!message.content.toLowerCase().startsWith(client.prefix.toLowerCase())) return;
    let args = message.content.slice(client.prefix.length).trim().split(" ");
    let commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    if (!command) return;
    client.ecoAddUser = message.author.id;
    command.execute(client, message, args);
};
