const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
    const embed = new MessageEmbed()
        .setAuthor("Commands")
        .setTitle("HELP")
        .setURL("https://twitch.tv/aspekts")
        .setDescription(`Total Commands: ${client.commands.size}`)
        .setColor("BLURPLE")
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/avatars/813352678662078477/24f522cfc8df6ed35bfb6207f3b4f24b.webp?size=1024")
        .setFooter(message.author.tag, message.author.displayAvatarURL);
    client.commands.forEach(cmd => {
        embed.addField(`${cmd.help.name}`, `Aliases: ${cmd.help.aliases.join(", ") || "None"}\nUsage: \`${client.prefix}${cmd.help.usage}\``, true);
    });
    return message.channel.send(embed);
}

exports.help = {
    name: "help",
    aliases: ["h"],
    usage: `help`
}
