const express = require('express');
const app = express();
const partials = require('express-partials');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Database } = require("quickmongo");
const db = new Database(process.env.URL)
const Quickdb = require("quick.db");

//START OF BOT CODE//
const Discord = require("discord.js");
require("dotenv").config();

const { Intents } = require("discord.js")
const ints = new Intents([
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.DIRECT_MESSAGES
])
const client = new Discord.Client(
  { intents: ints },
  { allowedMentions: { parse: ['users', 'roles'], repliedUser: true } }
);
client.db = db


client.db.on("ready", async () => {
  const ping = await client.db.fetchLatency()
  console.log(`Database connected with a latency of around ${ping.average}ms!`)
});
const ms = require("ms")
client.config = require("./botConfig");
const canvacord = require("canvacord");
const { Player } = require('discord-player');
client.player = new Player(client, {
  enableLive: true,
  leaveOnEnd: true,
  ytdlDownloadOptions: {
    filter: "audioonly",
    requestOptions: {
      headers: {
        cookie: "VISITOR_INFO1_LIVE=12n5yxo0Lqw; CONSENT=PENDING+008; HSID=AXdXyVSPhSvhH4YoO; SSID=AKlU44cbkZJLnjSed; APISID=4A8j8imK3SFp1r1J/ANU9SJHU1pQjq0UQK; SAPISID=dcY_XMbPEAtU60g_/AFkVICi_nqTKJ1NiW; __Secure-3PAPISID=dcY_XMbPEAtU60g_/AFkVICi_nqTKJ1NiW; LOGIN_INFO=AFmmF2swRQIhAJ9yvsYT-eZ_8sZtBlzsUbSckJmGT_oELLSjh0ykpur5AiA2KBoiHBSN2B6UMQ5H5j9NmZ5RmKH5TF9hlf3LInPCiQ:QUQ3MjNmeExyWVFZa0I0NHVYZHJvQWYwaE1WcVdLaGhNVndzZ0xDZFROaGJvUEZMZkotM2lraGh5V010ZThaMDFTSl9VTUN5bkRBVk81eC1CUEhzcUxDc3FhZVhRTWttdHNOaHZrVERnXzZ0MFNyN2wxcWNCZWdTYnBXV1hxRzRzNWJBOUVHQ2Y5ajdBaVJidTBPb0lRYUFCMmdCQ2V4YVg0Z0NDaHNtdUw4YTMyUjdFbzd4LVJVMVE2ZmdGRkhXcVp6VWpoSHJqTDl1ZzFKQ2RHMGxJN2VjQU1SelpXX2ZNdw==; PREF=tz=Europe.London&f4=4000000&f6=40000000&f5=30000; SID=-wcNK0tWmZPAgdWIaMzudDaOrmdfAyUYP0ZddbW2XUXnPPSzxO2zV0lzIdjWzQU7cPNk9w.; __Secure-3PSID=-wcNK0tWmZPAgdWIaMzudDaOrmdfAyUYP0ZddbW2XUXnPPSzr_Pa9GWqBNAzFa5y6ZBhXQ.; YSC=_IVeda5iQXU; SIDCC=AJi4QfFq4qPJLFECjHR-ZMPGkM14s9xWjr-ST0f6ntHz4qgctOT9F5pCb7LNnKz8S9VCwHXEZsM; __Secure-3PSIDCC=AJi4QfGRUr_5nc-F7i2d0Sg_gheXsun4pL2klyug_49Q8K3YTaK-1waXL45FId2YQdwMR62AR6Q"
      }
    }
  }
});
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);
const config = require("./config.json")
client.emotes = client.config.emojis;
client.filters = client.config.filters;
const humanizeDuration = require('humanize-duration');
const hypixel = require("hypixel-api-nodejs");

// Cooldowns
const cooldowns = {
  "hypixel": {
    "main": new Map(),
    "pit": new Map()
  }
};

// Important Global Variables
let
  key = `6566f98c-f567-41b7-8863-5387635bc51a`,           // CHANGE THIS OR THE BOT WONT WORK!
  token = process.env.TOKEN,       // CHANGE THIS OR THE BOT WONT WORK!
  prefix = client.prefix                       // Change this to yours!
  ;
// API Helpers
const embedHelper = {
  footer: {
    text: 'Hypixel Commands are a pain ngl',                                           // Change this to yours!
    image: {
      'green': 'https://cdn.discordapp.com/emojis/722990201307398204.png?v=1',
      'red': 'https://cdn.discordapp.com/emojis/722990201302941756.png?v=1'
    }
  }
};
// Send Error Embed
function sendErrorEmbed(channel, error, description) {
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#F64B4B')
    .setTitle(`Oops!`)
    .addField(`${error}`, `${description}`)
    .setThumbnail('https://hypixel.monster/assets/images/hypixel.png')              // Change this to yours!
    .setTimestamp()
    .setFooter(embedHelper.footer.text, embedHelper.footer.image.red)
  return channel.send({ embeds: exampleEmbed });
}
// Minecraft Color Name to Hex
function minecraftColorToHex(colorname) {
  switch (colorname) {
    case "BLACK":
      return "#000000";
    case "DARK_BLUE":
      return "#0100BD";
    case "DARK_GREEN":
      return "#00BF00";
    case "DARK_AQUA":
      return "#00BDBD";
    case "DARK_RED":
      return "#BE0000";
    case "DARK_PURPLE":
      return "#BC01BC";
    case "GOLD":
      return "#DB9F37";
    case "GRAY":
      return "#BEBDBE";
    case "DARK_GRAY":
      return "#3F3F3F";
    case "BLUE":
      return "#3F3FFE";
    case "GREEN":
      return "#3FFE3E";
    case "AQUA":
      return "#40FCFF";
    case "RED":
      return "#FF3E3F";
    case "LIGHT_PURPLE":
      return "#FE3FFE";
    case "YELLOW":
      return "#FEFD3F";
    case "WHITE":
      return "#FFFFFF";
  }
}
// Change games returned by the Hypixel API to clean ones
String.prototype.toCleanGameType = function () {
  switch (this.toString()) {
    case "BEDWARS":
      return "BedWars";
    case "QUAKECRAFT":
      return "Quake";
    case "WALLS":
      return "Walls";
    case "PAINTBALL":
      return "Paintball";
    case "SURVIVAL_GAMES":
      return "Blitz Survival Games";
    case "TNTGAMES":
      return "TNT Games";
    case "VAMPIREZ":
      return "VampireZ";
    case "WALLS3":
      return "Mega Walls";
    case "ARCADE":
      return "Arcade";
    case "ARENA":
      return "Arena";
    case "UHC":
      return "UHC Champions";
    case "MCGO":
      return "Cops and Crims";
    case "BATTLEGROUND":
      return "Warlords";
    case "SUPER_SMASH":
      return "Smash Heroes";
    case "GINGERBREAD":
      return "Turbo Kart Racers";
    case "HOUSING":
      return "Housing";
    case "SKYWARS":
      return "SkyWars";
    case "TRUE_COMBAT":
      return "Crazy Walls";
    case "SPEED_UHC":
      return "Speed UHC";
    case "SKYCLASH":
      return "SkyClash";
    case "LEGACY":
      return "Classic Games";
    case "PROTOTYPE":
      return "Prototype";
    case "MURDER_MYSTERY":
      return "Murder Mystery";
    case "BUILD_BATTLE":
      return "Build Battle";
    case "DUELS":
      return "Duels";
    case "SKYBLOCK":
      return "SkyBlock";
    case "PIT":
      return "Pit";
    default:
      return "None";
  }
}
// Foreach in objects
var ObjectforEach = function (collection, callback, scope) {
  if (Object.prototype.toString.call(collection) === '[object Object]') {
    for (var prop in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, prop)) {
        callback.call(scope, collection[prop], prop, collection);
      }
    }
  } else {
    for (var i = 0, len = collection.length; i < len; i++) {
      callback.call(scope, collection[i], i, collection);
    }
  }
};
// Capitalize first letter and lowercase the rest
String.prototype.capitalizeFirst = function () {
  return this.toString().charAt(0).toUpperCase() + this.toString().slice(1).toLowerCase();
}
String.prototype.toTimeString = function () {
  let num = this.toString();
  if (num < 60) return `${num}m`;
  let hours = (num / 60);
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
}
// Add leading zeros
function pad(n) { return n < 10 ? '0' + n : n }



client.on('message', m => {
  if (m.author.bot) return;
  ;

  if (m.content.toLowerCase().startsWith(`${prefix}hypixel`)) {
    /* Cooldown */
    let cooldownT = 30 * 1000, cooldownG = cooldowns.hypixel.main.get(m.author.id);
    if (cooldownG) return m.channel.send(`Please wait ${humanizeDuration(cooldownG - Date.now(), { round: true })} before running this command again`);

    if (!args[0]) return sendErrorEmbed(m.channel, `Usage`, `${prefix}hypixel <user>`);
    let tinodata = { "rank": {}, "user": {} };
    m.channel.send(`${m.author}, fetching **Hypixel API Data**`).then(medit => {
      hypixel.getPlayerByName(key, `${args[0]}`).then(user => {
        if (!user.success || user.success == false || user.player == null || user.player == undefined || !user.player) { medit.delete(); return sendErrorEmbed(m.channel, `Unknown Player`, `Player has no data in Hypixel's Database`); };
        hypixel.getGuildByPlayer(key, `${user.player.uuid}`).then(guild => {
          switch (user.player.newPackageRank) {
            case "MVP_PLUS":
              tinodata.rank.displayName = "[MVP+]";
              tinodata.rank.name = "MVP+";
              tinodata.rank.color = minecraftColorToHex("AQUA");
              break;
            case "MVP":
              tinodata.rank.displayName = "[MVP]";
              tinodata.rank.name = "MVP";
              tinodata.rank.color = minecraftColorToHex("AQUA");
              break;
            case "VIP_PLUS":
              tinodata.rank.displayName = "[VIP+]";
              tinodata.rank.name = "VIP+";
              tinodata.rank.color = minecraftColorToHex("GREEN");
              break;
            case "VIP":
              tinodata.rank.displayName = "[VIP]";
              tinodata.rank.name = "VIP";
              tinodata.rank.color = minecraftColorToHex("GREEN");
              break;
            default:
              tinodata.rank.displayName = "";
              tinodata.rank.name = "None";
              tinodata.rank.color = minecraftColorToHex("GRAY");
          }
          if (user.player.monthlyPackageRank == "SUPERSTAR") {
            tinodata.rank.displayName = "[MVP++]";
            tinodata.rank.name = "MVP++";
            tinodata.rank.color = minecraftColorToHex("GOLD");
          }
          if (user.player.rank != undefined) {
            let rank = user.player.rank;
            if (rank == "YOUTUBER") {
              tinodata.rank.displayName = "[YouTuber]";
              tinodata.rank.name = "YouTuber";
              tinodata.rank.color = minecraftColorToHex("RED");
            } else {
              tinodata.rank.displayName = "[" + rank.capitalizeFirst() + "]";
              tinodata.rank.name = tinodata.rank.displayName.slice(1, tinodata.rank.displayName.length - 1).capitalizeFirst();
              tinodata.rank.color = minecraftColorToHex("RED");
            }
          }
          if (user.player.prefix != undefined) {
            let prefix = user.player.prefix;
            tinodata.rank.displayName = `[${prefix.replace(/[\[\]]|(\§a)|(\§b)|(\§c)|(\§d)|(\§e)|(\§f)|(\§0)|(\§9)|(\§8)|(\§7)|(\§6)|(\§5)|(\§4)|(\§3)|(\§2)|(\§1)|(\§b)|(\§l)|(\§c)|(\§s)|(\§n)|(\§r)/gmi, "").capitalizeFirst()}]`;
            tinodata.rank.name = tinodata.rank.displayName.slice(1, tinodata.rank.displayName.length - 1).capitalizeFirst();
            tinodata.rank.color = minecraftColorToHex("RED");
          }
          if (user.player.rankPlusColor) tinodata.rank.color = minecraftColorToHex(user.player.rankPlusColor);
          if (user.player.userLanguage) tinodata.user.language = user.player.userLanguage.capitalizeFirst(); else tinodata.user.language = "Not set";
          if (user.player.mcVersionRp && user.player.mcVersionRp != undefined && user.player.mcVersionRp != "") tinodata.user.version = user.player.mcVersionRp; else tinodata.user.version = "Not set";
          if (guild && guild.guild && guild.guild != undefined && guild.guild != null && guild.success == true && guild.guild.name != undefined && guild.guild.name) tinodata.user.guild = `[${guild.guild.name}](https://hypixel.net/guilds/${guild.guild.name_lower.replace(/[ ]/, "+")})`; else tinodata.user.guild = "None";
          if (user.player.mostRecentGameType && user.player.mostRecentGameType != undefined) tinodata.user.recentGameType = user.player.mostRecentGameType.toCleanGameType();
          tinodata.user.level = Math.ceil((Math.sqrt(user.player.networkExp + 15312.5) - 125 / Math.sqrt(2)) / (25 * Math.sqrt(2)));
          let lastLogin = new Date(user.player.lastLogin);
          let firstLogin = new Date(user.player.firstLogin);
          const embed = new Discord.MessageEmbed()
            .setColor(`${tinodata.rank.color}`)
            .setAuthor(`${m.author.tag}`, `https://cdn.discordapp.com/avatars/${m.author.id}/${m.author.avatar}?size=128`)
            .setTitle(`${tinodata.rank.displayName} ${user.player.displayname}`)
            .setURL(`https://hypixel.net/players/${user.player.displayname}`)
            .setThumbnail(`https://visage.surgeplay.com/head/128/${user.player.uuid}`)
            .setImage(`https://visage.surgeplay.com/full/512/${user.player.uuid}`)
            .addFields(
              { name: `**Rank**`, value: `${tinodata.rank.name}`, inline: true },
              { name: `**Karma**`, value: `${(user.player.karma == undefined) ? 0 : user.player.karma}`, inline: true },
              { name: `**Level**`, value: `${tinodata.user.level}`, inline: true },
              { name: `**Language**`, value: `${tinodata.user.language}`, inline: true },
              { name: `**Version**`, value: `${tinodata.user.version}`, inline: true },
              { name: `**Guild**`, value: `${tinodata.user.guild}`, inline: true },
              { name: `**Recent Game Type**`, value: `${(tinodata.user.recentGameType == undefined) ? "Not set" : tinodata.user.recentGameType}`, inline: true },
              { name: `**First Login**`, value: `${pad(firstLogin.getDate())}/${pad(firstLogin.getMonth() + 1)}/${firstLogin.getFullYear()} - ${pad(firstLogin.getHours())}:${pad(firstLogin.getMinutes())}`, inline: true },
              { name: `**Last Login**`, value: `${pad(lastLogin.getDate())}/${pad(lastLogin.getMonth() + 1)}/${lastLogin.getFullYear()} - ${pad(lastLogin.getHours())}:${pad(lastLogin.getMinutes())}`, inline: true }
            )
            .setTimestamp()
            .setFooter(embedHelper.footer.text, embedHelper.footer.image.green)
          if (user.player.socialMedia != undefined && user.player.socialMedia.links) {
            embed.addField(`\u200b`, `\u200b`);
            ObjectforEach(user.player.socialMedia.links, function (value, prop, obj) {
              if (prop == "HYPIXEL") value = `[${value.split("/")[4].split(".")[0]}](${value})`;
              if (prop == "TWITTER") value = `[${value.split("/")[3]}](${value})`;
              if (prop == "INSTAGRAM") value = `[${value.split("/")[3]}](${value})`;
              if (prop == "MIXER") value = `[${value.split("/")[3]}](${value})`;
              if (prop == "TWITCH") value = `[${value.split("/")[3]}](${value})`;
              if (prop == "YOUTUBE" && (value.toLowerCase().includes("/channel/") || value.toLowerCase().includes("/user/") || value.toLowerCase().includes("/c/"))) value = `[${value.split("/")[4]}](${value})`;
              if (prop == "YOUTUBE" && !(value.toLowerCase().includes("/channel/") || value.toLowerCase().includes("/user/") || value.toLowerCase().includes("/c/"))) value = `[${value.split("/")[3]}](${value})`;
              embed.addField(`**${prop.capitalizeFirst()}**`, `${value}`, true);
            });
          }
          cooldowns.hypixel.main.set(m.author.id, Date.now() + cooldownT);
          setTimeout(() => cooldowns.hypixel.main.delete(m.author.id), cooldownT);
          return medit.edit("\u200b", embed);
        });
      }).catch(e => function () {
        medit.edit(`Hypixel API Error`);
        console.log(e);
      });
    });
  }

  if (m.content.toLowerCase().startsWith(`${prefix}pit`)) {
    /* Cooldown */
    let cooldownT = 30 * 1000, cooldownG = cooldowns.hypixel.pit.get(m.author.id);
    if (cooldownG) return m.channel.send(`Please wait ${humanizeDuration(cooldownG - Date.now(), { round: true })} before running this command again`);


    if (!args[0]) return sendErrorEmbed(m.channel, `Usage`, `${prefix}pit <user>`);
    let tinodata = { "rank": {}, "user": {}, "pit": {} };
    hypixel.getPlayerByName(key, args[0]).then(user => {
      if (!user.success || user.success == false || user.player == null || user.player == undefined || !user.player) return sendErrorEmbed(m.channel, `Unknown Player`, `Player has no data in Hypixel's Database`);
      switch (user.player.newPackageRank) {
        case "MVP_PLUS":
          tinodata.rank.displayName = "[MVP+]";
          tinodata.rank.name = "MVP+";
          tinodata.rank.color = minecraftColorToHex("AQUA");
          break;
        case "MVP":
          tinodata.rank.displayName = "[MVP]";
          tinodata.rank.name = "MVP";
          tinodata.rank.color = minecraftColorToHex("AQUA");
          break;
        case "VIP_PLUS":
          tinodata.rank.displayName = "[VIP+]";
          tinodata.rank.name = "VIP+";
          tinodata.rank.color = minecraftColorToHex("GREEN");
          break;
        case "VIP":
          tinodata.rank.displayName = "[VIP]";
          tinodata.rank.name = "VIP";
          tinodata.rank.color = minecraftColorToHex("GREEN");
          break;
        default:
          tinodata.rank.displayName = "";
          tinodata.rank.name = "None";
          tinodata.rank.color = minecraftColorToHex("GRAY");
      }
      if (user.player.monthlyPackageRank == "SUPERSTAR") {
        tinodata.rank.displayName = "[MVP++]";
        tinodata.rank.name = "MVP++";
        tinodata.rank.color = minecraftColorToHex("GOLD");
      }
      if (user.player.rankPlusColor) tinodata.rank.color = minecraftColorToHex(user.player.rankPlusColor);

      const embed = new Discord.MessageEmbed()
        .setColor(`${tinodata.rank.color}`)
        .setAuthor(`${m.author.tag}`, `https://cdn.discordapp.com/avatars/${m.author.id}/${m.author.avatar}?size=128`)
        .setTitle(`${tinodata.rank.displayName} ${user.player.displayname}`)
        .setURL(`https://hypixel.net/players/${user.player.displayname}`)
        .setThumbnail(`https://visage.surgeplay.com/head/128/{user.player.uuid}`)
        .setImage(`https://visage.surgeplay.com/full/512/${user.player.uuid}`)
        .setTimestamp()
        .setFooter(embedHelper.footer.text, embedHelper.footer.image.green)
      if (!user.player.stats.Pit.pit_stats_ptl) {
        embed.setDescription(`**The Pit**\nCould not retrieve **The Pit** Stats for this user, maybe he/she never joined The Pit!`);
        return m.channel.send({ embeds: [embed] });
      }
      embed.addFields(
        { name: `**Kills**`, value: `${user.player.stats.Pit.pit_stats_ptl.kills}`, inline: true },
        { name: `**Deaths**`, value: `${user.player.stats.Pit.pit_stats_ptl.deaths}`, inline: true },
        { name: `**Assits**`, value: `${user.player.stats.Pit.pit_stats_ptl.assists}`, inline: true },
        { name: `**KDA**`, value: `${((user.player.stats.Pit.pit_stats_ptl.kills + user.player.stats.Pit.pit_stats_ptl.assists) / user.player.stats.Pit.pit_stats_ptl.deaths).toFixed(2)}`, inline: true },
        { name: `**Max streak**`, value: `${user.player.stats.Pit.pit_stats_ptl.max_streak}`, inline: true },
        { name: `**Prestige**`, value: `${(!user.player.stats.Pit.profile.prestiges) ? 0 : user.player.stats.Pit.profile.prestiges.length}`, inline: true },
        { name: `**Joins**`, value: `${user.player.stats.Pit.pit_stats_ptl.joins}`, inline: true },
        { name: `**Jumps into pit**`, value: `${user.player.stats.Pit.pit_stats_ptl.jumped_into_pit}`, inline: true },
        { name: `**Playtime**`, value: `${(!user.player.stats.Pit.pit_stats_ptl.playtime_minutes) ? `~0m` : user.player.stats.Pit.pit_stats_ptl.playtime_minutes.toString().toTimeString()}`, inline: true }
      )
        .setDescription(`Use [Pit Panda](https://pitpanda.rocks/players/${args[0]}) for more (and detailed) information!`)

      cooldowns.hypixel.pit.set(m.author.id, Date.now() + cooldownT);
      setTimeout(() => cooldowns.hypixel.pit.delete(m.author.id), cooldownT);
      return m.channel.send({ embeds: [embed] });
    });
  }
});
const Enmap = require("enmap")
client.points = new Enmap({ name: "points" });
const canvas = require('discord-canvas'),
  welcomeCanvas = new canvas.Welcome(),
  leaveCanvas = new canvas.Goodbye()


const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./gwdb.json",
  updateCountdownEvery: 3000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});



client.config = require("./botConfig");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.snipes = new Discord.Collection();
let universalColor = client.config.unicolor.toUpperCase()
let imageLink = "https://marketplace.canva.com/EAD2962NKnQ/2/0/800w/canva-rainbow-gradient-pink-and-purple-zoom-virtual-background-98aZLNQxJXg.jpg"

client.on('guildMemberAdd', async member => {
  if (member.guild.id != '658976660703543297') return;
  let image = await welcomeCanvas
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setMemberCount(member.guild.memberCount)
    .setGuildName(member.guild.name)
    .setAvatar(member.user.displayAvatarURL({
      format: 'png'
    }))
    .setColor("border", universalColor)
    .setColor("username-box", universalColor)
    .setColor("discriminator-box", universalColor)
    .setColor("message-box", universalColor)
    .setColor("title", universalColor)
    .setColor("avatar", universalColor)
    .setBackground(imageLink)
    .toAttachment()


  let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

  member.send(attachment)
})
client.on('guildMemberRemove', async member => {
  if (member.guild.id != '658976660703543297') return;
  let image = await leaveCanvas
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setMemberCount(member.guild.memberCount)
    .setGuildName(member.guild.name)
    .setAvatar(member.user.displayAvatarURL({
      format: 'png'
    }))
    .setColor("border", universalColor)
    .setColor("username-box", universalColor)
    .setColor("discriminator-box", universalColor)
    .setColor("message-box", universalColor)
    .setColor("title", universalColor)
    .setColor("avatar", universalColor)
    .setBackground(imageLink)
    .toAttachment()


  let attachment = new Discord.MessageAttachment(image.toBuffer(), "leave-image.png");

  member.send(attachment)
})
client.on("messageCreate", async message => {

  const startTime = require("./commands/afk.js")

  //under if(message.author.bot)

  if (db.has(`afk-${message.author.id}+${message.guild.id}`)) {


    await db.delete(`afk-${message.author.id}+${message.guild.id}`)
    message.channel.send(`Your afk status has been removed. Welcome Back! `).then(msg => {
      msg.delete({ timeout: 5000 })
    })
  }
  const nick = message.member ? message.member.displayName : null;
  if (nick && nick.startsWith('[AFK]')) {
    message.member.setNickname(nick.replace('[AFK]', ''));
  }
  //checking for mentions
  if (message.mentions.members.first()) {
    if (db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
      const endTime = Date.now();
      const timeTakenMs = endTime - startTime;
      const timeTaken = timeTakenMs
      message.channel.send(`${message.mentions.members.first().user.tag}` + ` is currently afk, for the past ${timeTaken}. Reason: ` + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}.`))
        .catch(err => {
          message.channel.send(`There has been a fatal error when running this command. Please use the y!report command with the following error:${err}`)
        })



    } else return;
  } else;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.channel.type === `dm`) return;
  //////////////////////////////////////////
  /////////////RANKING SYSTEM///////////////
  //////////////////////////////////////////
  //get the key of the user for this guild
  const rankkey = `${message.guild.id}-${message.author.id}`;
  // do some databasing
  client.points.ensure(`${message.guild.id}-${message.author.id}`, {
    user: message.author.id,
    guild: message.guild.id,
    points: 0,
    level: 1
  });
  //create message length basically math for not too much xp for too long messages
  var msgl = message.content.length / (Math.floor(Math.random() * (message.content.length - message.content.length / 100 + 1) + 10));
  //if too short the message
  if (msgl < 10) {
    //get a random num between 0 and 2 rounded
    var randomnum = Math.floor((Math.random() * 2) * 100) / 100
    //basically databasing again
    client.points.math(rankkey, `+`, randomnum, `points`)
    client.points.inc(rankkey, `points`);
  }
  //if not too short do this
  else {
    //get a random num between rounded but it belongs to message length
    var randomnum = 1 + Math.floor(msgl * 100) / 100
    //basically databasing again
    client.points.math(rankkey, `+`, randomnum, `points`)
    client.points.inc(rankkey, `points`);
  }
  //get current level
  const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(rankkey, `points`)));
  //if its a new level then do this
  if (client.points.get(rankkey, `level`) < curLevel) {

    //define ranked embed
    const embed = new Discord.MessageEmbed()
      .setTitle(`Ranking of ${message.author.username}`)
      .setTimestamp()
      .setDescription(`You've leveled up to Level: **\`${curLevel}\`**! (Points: \`${Math.floor(client.points.get(rankkey, `points`) * 100) / 100}\`) `)
      .setColor("GREEN");
    //send ping and embed message
    message.channel.send(`<@` + message.author.id + `>`);
    message.channel.send({ embeds: [embed] });
    //set the new level
    client.points.set(rankkey, curLevel, `level`);
  }
  //else continue or commands...
  //
  if (message.content.toLowerCase().startsWith(`${prefix}rank`)) {
    //get the rankuser
    let rankuser = message.mentions.users.first() || message.author;
    client.points.ensure(`${message.guild.id}-${rankuser.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });
    //do some databasing
    const filtered = client.points.filter(p => p.guild === message.guild.id).array();
    const sorted = filtered.sort((a, b) => b.points - a.points);
    const top10 = sorted.splice(0, message.guild.memberCount);
    let i = 0;
    //count server rank sometimes an error comes
    for (const data of top10) {
      await delay(15);
      try {
        i++;
        if (client.users.cache.get(data.user).tag === rankuser.tag) break;
      } catch {
        i = `Error counting Rank`;
        break;
      }
    }
    const rankkey = `${message.guild.id}-${rankuser.id}`;
    //math
    let curpoints = Number(client.points.get(rankkey, `points`).toFixed(2));
    //math
    let curnextlevel = Number(((Number(1) + Number(client.points.get(rankkey, `level`).toFixed(2))) * Number(10)) * ((Number(1) + Number(client.points.get(rankkey, `level`).toFixed(2))) * Number(10)));
    //if not level == no rank
    if (client.points.get(rankkey, `level`) === undefined) i = `No Rank`;
    //define a temporary embed so its not coming delayed
    let tempmsg = await message.channel.send(new Discord.MessageEmbed().setColor("RED").setAuthor("Calculating...", "https://cdn.discordapp.com/emojis/769935094285860894.gif"))
    //global local color var.
    let color;
    //define status of the rankuser
    let status = rankuser.presence.status;
    //do some coloring for user status cause cool
    if (status === "dnd") { color = "#ff0048"; }
    else if (status === "online") { color = "#00fa81"; }
    else if (status === "idle") { color = "#ffbe00"; }
    else { status = "streaming"; color = "#a85fc5"; }
    //define the ranking card
    const rank = new canvacord.Rank()
      .setAvatar(rankuser.displayAvatarURL({ dynamic: false, format: 'png' }))
      .setCurrentXP(Number(curpoints.toFixed(2)), color)
      .setRequiredXP(Number(curnextlevel.toFixed(2)), color)
      .setStatus(status, false, 7)
      .renderEmojis(true)
      .setProgressBar(color, "COLOR")
      .setRankColor(color, "COLOR")
      .setLevelColor(color, "COLOR")
      .setUsername(rankuser.username, color)
      .setRank(Number(i), "Rank", true)
      .setLevel(Number(client.points.get(rankkey, `level`)), "Level", true)
      .setDiscriminator(rankuser.discriminator, color);
    rank.build()
      .then(async data => {
        //add rankcard to attachment
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        //define embed
        const embed = new Discord.MessageEmbed()
          .setTitle(`Ranking of ${rankuser.username}`)
          .setColor(color)
          .setImage("attachment://RankCard.png")
          .attachFiles(attachment)
        //send that embed
        await message.channel.send({ embeds: [embed] });
        //delete that temp message
        await tempmsg.delete();
        return;
      });
  }
  //leaderboard command
  if (message.content.toLowerCase().startsWith(`${client.prefix}xpleaderboard`) || message.content.toLowerCase().startsWith(`${client.prefix}xplb`)) {
    //some databasing and math
    const filtered = client.points.filter(p => p.guild === message.guild.id).array();
    const sorted = filtered.sort((a, b) => b.points - a.points);
    const top10 = sorted.splice(0, 10);
    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name}: XP Leaderboard`)
      .setTimestamp()
      .setDescription(`Top 10 Ranking:`)
      .setColor("BLURPLE");
    //set counter to 0
    let i = 0;
    //get rank 
    for (const data of top10) {
      await delay(15); try {
        i++;
        embed.addField(`**${i}**. ${client.users.cache.get(data.user).tag}`, `Points: \`${Math.floor(data.points * 100) / 100}\` | Level: \`${data.level}\``);
      } catch {
        i++; //if usernot found just do this
        embed.addField(`**${i}**. ${client.users.cache.get(data.user)}`, `Points: \`${Math.floor(data.points * 100) / 100}\` | Level: \`${data.level}\``);
      }
    }
    //schick das embed
    return message.channel.send({ embeds: [embed] });
    function delay(delayInms) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    }
  }


  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
  if (message.content.startsWith("y!welcometest")) {
    client.emit('guildMemberAdd', message.member);
  }
  if (message.content.startsWith("y!leavetest")) {
    client.emit('guildMemberRemove', message.member);
  }
  if (message.content.toLowerCase().startsWith('y!jointest')) {
    client.emit('guildCreate', message.guild)
  }
  if (client.config.blacklisted.includes(message.author.id)) return;
  let set = client.db.get(`g_${message.guild.id}`);
  if (message.channel.id === set) {


    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      message.delete()
      const embed = new Discord.MessageEmbed()
      embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
      if (message.content) {
        embed.addField("Message:", message.content)
      }
      if (message.attachments.size > 0) {
        const img = message.attachments.first().url
        embed.setImage(img)
      }
      embed.setColor("NONE")
      embed.setFooter(`Server: ${message.guild.name} || Members: ${message.guild.memberCount}`);


      client.guilds.cache.forEach(g => {
        try {
          client.channels.cache.get(client.db.get(`g_${g.id}`)).send({ embeds: [embed] });
        } catch (e) {
          return;
        }
      });
    }
    else return message.channel.send("I need the `MANAGE_MESSAGES` permission to run this in the best way possible");

  }


});

const fs = require("fs");

client.on('ready', async () => {
  console.log('Well done, prefix migration complete without errors.')
  console.log("Hello World!")
  const slashFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
  for (const file of slashFiles) {
    const command = require(`./slash/${file}`);
    client.api.applications(client.user.id).commands.post({
      data: {
        name: command.name,
        description: command.description,
        options: command.commandOptions
      }
    })
    if (command.global == true) {
      client.api.applications(client.user.id).commands.post({
        data: {
          name: command.name,
          description: command.description,
          options: command.commandOptions
        }
      })
    }
    client.commands.set(command.name, command);
    console.log(`Command POST : ${command.name} from ${file} (${command.global ? "global" : "guild"})`)
  }

  console.log("")

});
client.ws.on('INTERACTION_CREATE', async interaction => {

  if (!client.commands.has(interaction.data.name)) return;

  try {
    client.commands.get(interaction.data.name).execute(interaction);
  } catch (error) {
    console.log(`Error from command ${interaction.data.name} : ${error.message}`);
    console.log(`${error.stack}\n`)
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: `Sorry, there was an error executing that command!`
        }
      }
    })
  }

})


const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Load status");
table.setBorder('*')

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(f => {
    if (!f.endsWith(".js")) return;
    const event = require(`./events/${f}`);
    let eventName = f.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(f => {
    if (!f.endsWith(".js")) return;
    let command = require(`./commands/${f}`);
    client.commands.set(command.help.name, command);
    command.help.aliases.forEach(alias => {
      client.aliases.set(alias, command.help.name);
    });
  });
});
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of player) {
  console.log(`Loading discord-player event ${file}`);
  const event = require(`./player/${file}`);
  client.player.on(file.split(".")[0], event.bind(null, client));
};
client.on("guildCreate", guild => {
  const channel = ('695957739255627777')

  let embed = new Discord.MessageEmbed()
    .setTitle(`Hi!`)
    .setDescription(`Thank you for adding me to the server! My prefix here is y! but you can always change it using y!prefix <prefix> . Lets have a good time!`)
    .setColor("RANDOM")
    .setTimestamp()
  guild.systemChannel.send({ embeds: [embed] })
  client.channels.cache.get(`829432199261716480`).send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  client.channels.cache.get(`829432200062959636`).send(`I have been removed from: ${guild.name} (id: ${guild.id}). This guild had ${guild.memberCount} members! Oof.`);
});






client.login(process.env.TOKEN);

const port = 80;
app.set('port', port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(partials());
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(session({
  secret: '48738924783748273742398747238',
  resave: false,
  saveUninitialized: false,
  expires: 604800000,
}));

app.listen(port, () => console.info(`Listening on port ${port}!`));

// \|/
// okk we are done now
// /|\

require('./router')(app); // There is a router for Discord.js there, thanks to which Discord Oauth2 works.

// First, when a visitor enters the home page, he should get the home page.
app.get('/', (req, res) => {
  res.render('index', { user: req.session.user, req: req }); // this renders views/index.ejs
});

// The logged-in user can check his 'profile' settings.
app.get('/user', async (req, res) => {
  if (!req.session.user) return res.redirect('/authorize'); // Of course, if he is not logged in, he must do so.
  res.render('user', { user: req.session.user, req: req, db: db }); // this renders views/user.ejs
});

// Whether you like it or not, the dashboard is for server management. This part is from displaying authorized user servers.
app.get('/user/guilds', async (req, res) => {
  if (!req.session.user) return res.redirect('/'); // Likewise, he must be logged in. If not, let him do it.
  res.render('guilds', { db: db, session: session, req: req, user: req.session.user, bot: client }); // this renders views/guilds.ejs
});

// If we want to display information about an already selected server, create its house for it.
app.get('/guild/:id', async function (req, res) { // Param ":id" means something that can be your own, customizable. In this case it will be the server ID. For example: /guild/671767027240796176 is uPros guild manage page.
  if (!req.session.user) return res.redirect('/'); // If the user is not logged in, let him do so.
  if (!client.guilds.cache.get(req.params.id)) return res.redirect('/user/guilds'); // If the bot is not on the server with the given ID, let's get the user back.
  await client.guilds.cache.get(req.params.id).members.fetch(req.session.user.id);
  if (!client.guilds.cache.get(req.params.id).members.cache.get(req.session.user.id).hasPermission('MANAGE_GUILD')); // Oh, I think he wanted to manage someone's server without permission on that server! Not so easy! Let's get him back!
  res.render('guild', { db: db, session: session, req: req, user: req.session.user, bot: client }); // this renders views/guild.ejs
});

// If someone wants to edit the settings contained in the setup category, the browser will make a POST request there.
app.post('/edit/setup/:id', async (req, res) => {
  if (!req.session.user) return res.redirect('/'); // If the user is not logged in, let him do so.
  if (!client.guilds.cache.get(req.params.id).members.cache.get(req.session.user.id).hasPermission('MANAGE_GUILD')) return res.redirect('/user/guilds'); // Oh, I think he wanted to manage someone's server without permission on that server! Not so easy! Let's get him back!
  await db.set(`prefix_${req.params.id}`, req.body.prefix.replace('\r\n', "")); // Set the bot prefix as the one we got in request body.
  if (req.body.lang == "en") {
    await db.set(`${req.params.id}.lang`, "en"); // If body.lang == en, set bot language as English.
  } else if (req.body.lang == "pl") {
    await db.set(`${req.params.id}.lang`, "pl"); // If body.lang == pl, set bot language as Polish.
  } else {
    await db.set(`${req.params.id}.lang`, "en"); // If body.lang != en && body.lang != pl, set bot language as English.
  }
  res.redirect('/guild/' + req.params.id); // Done! Let us return you to this server's page.
});

// This part is only from the /api page rendered from the browser.
app.get('/api', async (req, res) => {
  if (!req.session.user) return res.redirect('/authorize'); // If the user is not logged in, let him do so.
  res.render('api', { user: req.session.user, req: req, db: db }); // this renders views/api.ejs
});

// If the user wants to refresh their token from the /user page, they will send it here.
app.post('/token/regenerate', async (req, res) => {
  if (!req.session.user) return res.redirect('/authorize'); // If the user is not logged in, let him do so.

  const generateRandomString = function (length = 10) {
    return Math.random().toString(20).substr(2, length); // Generates random string.
  }
  await db.set(`${req.session.user.id}_token`, generateRandomString() + `${req.session.user.id}` + generateRandomString()); // Set-up a new token.
  res.redirect('/user'); // Return user to the /user page
});

// If the user wants to refresh his token, but from the /api page, he will send it here.
app.post('/token/regenerate/api', async (req, res) => {
  if (!req.session.user) return res.redirect('/authorize'); // If the user is not logged in, let him do so.

  const generateRandomString = function (length = 10) {
    return Math.random().toString(20).substr(2, length);// Generates random string.
  }
  await db.set(`${req.session.user.id}_token`, generateRandomString() + `${req.session.user.id}` + generateRandomString()); // Set-up a new token.
  res.redirect('/api'); // Return user to the /api page
});


app.get('/invite', (req, res) => {
  res.redirect(config.inviteLink);
});

// \|/
// API - for more advanced projects, in which the user can make a request from another project to yours and obtain / transfer information.
// /|\

// Now let's go to the POST available without logging in.
// Note, you can get here from outside the site. Other projects can make the request here.
app.post('/api/v1/example', async (req, res) => {
  if (!req.headers.authorization) return res.send({ "error": true, "message": "No API key provided." }); // Check that the API token was provided.
  let token = req.headers.authorization; // token is "Authorization" header
  if (token.length != 38) return res.send({ "error": true, "message": "An invalid key provided." }); // If the token is not long enough, it is invalid.
  let tokenOwner = token.slice(10, -10); // Determine who owns the token.
  let tokenDb = await db.get(`${tokenOwner}_token`); // This is the user's token, if any.
  if (tokenDb != token) return res.send({ "error": true, "message": "An invalid key provided." }); // Check that this token is the same as this user.
  res.send({ error: 'false', message: `you post this in body: ${JSON.stringify(req.body)}` }); // If all went well, return the data, do something with the received etc.
  //u can now do stuff with POSTED data and / or token's owner id
});