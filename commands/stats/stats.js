const Discord = require('discord.js');
const os = require('os');
const ms = require('ms');
const moment = require('moment');
const osu = require('node-os-utils');
const {mem} = require('node-os-utils');
const {stripIndent} = require('common-tags');
module.exports.execute = async (client, message, args) => {
  const cpu = osu.cpu;
  cpu.usage().then((info) => {
    message.channel.send({
      embeds: [
        {
          stats: {
            title: `Statistics of ${client.user.username}`,
            color: 'NONE',
            description: 'test',
            thumbnail: client.user.displayAvatarURL(),
            timestamp: new Date(),
            fields: [
              {
                name: 'Owner',
                value: `[Aspekts](https://twitch.tv/aspekts)`,
                inline: false,
              },
              {
                name: 'Server Count',
                value: `${client.guilds.cache.size}`,
                inline: true,
              },
              {
                name: 'Users Count',
                value: `${client.users.cache.size}`,
                inline: true,
              },
              {
                name: 'Channel Count',
                value: `${client.channels.cache.size}`,
                inline: true,
              },
              {name: 'Architecture', value: `${os.arch()}`, inline: true},
              {name: 'Platform', value: os.platform(), inline: true},
              {name: 'Node Version', value: process.version, inline: true},
              {name: 'Shards', value: client.ws.shards.size, inline: true},
              {name: 'Uptime', value: ms(os.uptime()), inline: true},
              {name: 'CPU Usage', value: `${info}%`, inline: true},
              {name: 'Total RAM', value: `${os.totalmem()}MB`, inline: true},
              {name: 'Used RAM', value: `${os.freemem()}MB`, inline: true},
              {
                name: 'Discord.js Version',
                value: Discord.version,
                inline: true,
              },
              {
                name: 'Yarn Version',
                value: client.config.version,
                inline: true,
              },
            ],
            footer: {
              name: message.author.tag,
              value: message.author.displayAvatarURL(),
            },
          },
        },
      ],
    });
  });
};

module.exports.help = {
  name: 'stats',
  aliases: ['info', 'i'],
  usage: 'stats',
};
