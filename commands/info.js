const Discord = require('discord.js');
exports.execute = async (client, message, args) => {
    const embed = new Discord.MessageEmbed();
    embed.setThumbnail("https://cdn.discordapp.com/avatars/813352678662078477/24f522cfc8df6ed35bfb6207f3b4f24b.webp?size=1024")
    embed.setTitle(':information_source: BladeTrades Bot info');
    embed.setDescription('Here\'s some info about me');
    embed.addField(':white_check_mark: API Status', `ONLINE & bot latency to this server is ${Math.round(client.ws.ping)}ms`);
    embed.addField(':spy:  My master, @Aspekts#6969.', 'https://twitch.tv/aspekts');
    embed.addField(':wrench: Made for BladeTrades', 'Don\'t ask me why i did it for free, I couldn\'t tell you' )
    embed.addField(':purple_heart:  My Life', 'I\'m currently being hosted and coded on repl, using a combination of the repl\'s hacker plan and uptime robot to host it. ');
    embed.setColor('#00ff00');
    embed.addField(':satellite_orbital: Server dominance', `Found ${client.guilds.cache.size} server instances with a population of ${client.users.cache.size} users`);
    return message.channel.send(embed);
}
exports.help = {
    name: "info",
    aliases: ["i"],
    usage: `info`
}