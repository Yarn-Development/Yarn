const { MessageEmbed } = require("discord.js");
const pagination = require('discord.js-pagination')

// Destructure the package

exports.execute = async (client, message, args) => {
  if (!args[0]) {
            const misc = message.client.commands.filter(x => x.help.category == 'Misc').map((x) => '`' + x.help.name + '`').join(' ◦  ');
            const music = message.client.commands.filter(x => x.help.category == 'Music').map((x) => '`' + x.help.name + '`').join(' ◦  ');
             const eco = message.client.commands.filter(x => x.help.category == 'Economy').map((x) => '`' + x.help.name + '`').join(' ◦  ');
              const gw = message.client.commands.filter(x => x.help.category == 'Giveaway').map((x) => '`' + x.help.name + '`').join(' ◦  ');
              const mod = message.client.commands.filter(x => x.help.category == 'Moderation').map((x) => '`' + x.help.name + '`').join(' ◦  ')


    const embed = new MessageEmbed()
        .setAuthor("Page 1 - Introduction")
        .setTitle("HELP")
        .setURL("https://www.yarnbot.ml")
        .setDescription(`Hey there, you've reached the Yarn Command Portal!`)
        .setTimestamp()
         .setThumbnail(client.user.displayAvatarURL())
        .setFooter(message.author.tag, message.author.displayAvatarURL);
    
        embed.addField(`For economy`,`Go to page 2`);
        embed.addField(`For moderation`,`Page 3`)
        embed.addField(`For music`,` Page 4`)
        embed.addField(`For levelling`,'Page 5')
        embed.addField('For Hypixel', 'Page 6')
        embed.addField('For giveaways', 'Page 7')
        embed.addField('For games',` Page 8 or use yg!help`)
        embed.addField(`For other commands`, `Page 9`)
    const embedeco = new MessageEmbed()
    .setTitle('Economy Commands')
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor('Page 2 - Economy')
    .setDescription('Do y!help <command> for more info on a command.')
    .addField(`Commands`, eco)

  const embedmod = new MessageEmbed()
   .setTitle('Moderation Commands')
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor('Page 3 - Moderation')
    .setDescription('Do y!help <command> for more info on a command.')
    .addField(`Commands`, mod)
const embedmusic = new MessageEmbed()
 .setTitle('Music Commands')
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor('Page 4 - Music')
    .setDescription('Do y!help <command> for more info on a command.')
    .addField(`Commands`, music)
    .addField(`Music Filters`, client.filters.map((x) => '`' + x + '`').join(' ◦  '))
    const embedxp = new MessageEmbed()
    .setTitle('Levelling Commands')
     .setThumbnail(client.user.displayAvatarURL())
    .setAuthor(`Page 5 - Levelling`)
    .setDescription('Do y!help <command> for more info on a command.')
    .addField('Commands','`rank` ◦  `xpleaderboard`')

    const embedhyp = new MessageEmbed()
    .setTitle('Hypixel Commands')
     .setThumbnail(client.user.displayAvatarURL())
    .setAuthor('Page 6 - Hypixel')
    .setDescription('Do y!help <command> for more info on a command.')
    .addField('Hypixel Info', 'Hypixel is one of the largest and highest quality Minecraft Server Networks in the world, featuring original and fun games such as Skyblock, BedWars, SkyWars, and many more! To play on the Hypixel Server, you will need to own a Minecraft account for PC/Mac (sometimes known as the Java version). The commands below are used for users to be able to track their hypixel server statistics via Discord.')
    .addField('Commands', '`hypixel` ◦ `pit`')
    const embedgw = new MessageEmbed()
    .setTitle('Giveaway Commands')
    .setAuthor('Page 7 - Giveaways')
     .setThumbnail(client.user.displayAvatarURL())
    .setDescription('Do y!help <command> for more info on a command.')
    .addField('Commands',gw)

    const embedgame = new MessageEmbed()
    .setTitle('Yarn Games')
    .setAuthor('Page 8 - Games')
     .setThumbnail(client.user.displayAvatarURL())
    .setDescription('Do y!help <command> for more info on a command.')
    .addField('Note','The hosting for the games side of Yarn (seperate to the rest of Yarn) is still under maintenance, so commands may be off for prolonged periods of time.')
    .addField('Commands', '`tr` ◦ `chess` ◦ `hangman` ◦ `connect4` ◦ `snake` ◦ `stop`')
    const embedmisc = new MessageEmbed()
    .setTitle('Miscellaneous Commands')
     .setThumbnail(client.user.displayAvatarURL())
    .setAuthor('Page 9 - Miscellaneous Commands')
    .setDescription('Do y!help <command> for more info on a command.')
    .addField('Commands',misc)
    const embedlinks = new MessageEmbed()
    .setTitle('Useful Links')
     .setThumbnail(client.user.displayAvatarURL())
    .setAuthor('Page 10 - Useful Links')
    .addField('Website','[https://yarnbot.xyz](https://www.yarnbot.xyz)')
    .addField('Invite','[Invite Link](https://invite.yarnbot.xyz)')
    const pages = [embed, embedeco, embedmod, embedmusic, embedxp ,embedhyp ,embedgw ,embedgame, embedmisc, embedlinks];
// Change pages when sending numbers.
      const emojis = ['◀', '▶'];
        const timeout = '100000'

        pagination(message, pages, emojis, timeout)
    }
    else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - I did not find this command !`);

            message.channel.send({
                embed: {
                    color: 'ORANGE',
                    author: { name: 'Extra Command info' },
                    fields: [
                        { name: 'Name', value: command.help.name, inline: true },
                        { name: 'Category', value: command.help.category, inline: true },
                        { name: 'Alias(es)', value: command.help.aliases.length < 1 ? 'None' : command.help.aliases.join(', '), inline: true },
                        { name: 'Usage', value: command.help.usage, inline: true },
                    ],
                    timestamp: new Date(),
                   
                }
            });
        };
}
exports.help = {
    name: "help",
    category:'Core',
    aliases: ["h"],
    usage: `help`
}
