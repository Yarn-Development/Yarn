const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
  	  db = require('quick.db');
exports.execute = async (client, message) => {


        const botprefix = 'bt!'; //put your prefix here

    const messageArray = message.content.split(' ');
    const args = messageArray.slice(1);
    let reason = args.slice(0).join(' ');
    //function to trim strings, ensuring they don't exceed X chars in length
    trimStr = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

    if (message.guild) {


        if (message.content.startsWith(`${botprefix}afk`)) {

            const nick = message.member.nickname;
            if (nick && nick.startsWith('[AFK]')) {
                message.member.setNickname(message.member.displayName.replace('[AFK]', ''))
                message.reply("Welcome back! I've removed your AFK status.");
            } else {
                const newNickname = trimStr(`[AFK] ${message.author.username}`);

                message.member.setNickname(newNickname).catch(err => {
                    const errorEmbed = new Discord.MessageEmbed()
                        .setTitle(err)
                        .setDescription(`${message.author}, I could not set your nickname!`)
                        .addField('Possible Reasons\n\n', `\n__Hierarchy Permissions__ - Your role is higher than mine!\n__Owner__ - You are the owner of the server!\n__Permission Missing__ - Missing permission \`MANAGE_NICKNAMES\`\n\n**Troubleshoot with the problems above until it works!** `)
                        .setColor('RED')

                    return message.channel.send(errorEmbed)
                });
                if (!reason) return message.reply(`You are now afk for reason: **No Reason Given** | Do ${botprefix}afk again when you come back to remove it!`)
                message.reply(`You are now afk for reason: **${reason}** | Do ${botprefix}afk again when you come back to remove it!`);
            }
        };
    };
}
module.exports.help = {
  name: "afk",
  aliases:[],
  usage: "afk or bt!afk <Your afk message>"
}
