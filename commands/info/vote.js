const Discord = require('discord.js');
exports.execute = async (client, message, args) => {
    const embed = new Discord.MessageEmbed();
    embed.setTitle(`Vote for ${client.user.username}!`);
    embed.addField('discordbotlist.com', '[Vote](https://discordbotlist.com/bots/yarn/upvote)');
    embed.addField('top.gg', '[Vote](https://top.gg/bot/814174226037866537)')
    embed.setDescription('Voting is the second best way to support me and my development (after donating) and its free!')
    embed.setFooter("Thank You!")
    embed.setColor('RANDOM');
    return message.channel.send({embeds:[embed]});
}
exports.help = {
    name: "vote",
    aliases: ["v"],
    usage: `vote`
}