
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//START OF BOT CODE//
const Discord = require("discord.js");

Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord iOS"
 const client = new Discord.Client({ disableMentions: 'everyone'});
 client.config = require("./botConfig");
 const { Player } = require('discord-player');

client.player = new Player(client);
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
    token = `ODE0MTc0MjI2MDM3ODY2NTM3.YDaA1g.IS0l8tXy_FC6KlzAcg8Q75z4E2M`,       // CHANGE THIS OR THE BOT WONT WORK!
    prefix = client.config.prefix                       // Change this to yours!
;
// API Helpers
const embedHelper = { 
    footer: {
        text: 'Hypixel Commands are a pain ngl',                                           // Change this to yours!
        image: {
            'green': 'https://cdn.discordapp.com/emojis/722990201307398204.png?v=1',
            'red':   'https://cdn.discordapp.com/emojis/722990201302941756.png?v=1'
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
    return channel.send(exampleEmbed);
}
// Minecraft Color Name to Hex
function minecraftColorToHex(colorname) {
    switch(colorname) {
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
String.prototype.toCleanGameType = function() {
    switch(this.toString()) {
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
String.prototype.capitalizeFirst = function() {
    return this.toString().charAt(0).toUpperCase() + this.toString().slice(1).toLowerCase();
}
String.prototype.toTimeString = function() {
    let num = this.toString();
    if(num < 60) return `${num}m`;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}h ${rminutes}m`;
}
// Add leading zeros
function pad(n){return n<10 ? '0'+n : n}



client.on('message', m => {
        if(m.author.bot) return;
        const args = m.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
        
        if(command == "hypixel") {
            /* Cooldown */
            let cooldownT = 30 * 1000, cooldownG = cooldowns.hypixel.main.get(m.author.id);
            if(cooldownG) return m.channel.send(`Please wait ${humanizeDuration(cooldownG - Date.now(), { round: true })} before running ${command} again`);
            
            if(!args[0])  return sendErrorEmbed(m.channel, `Usage`, `${prefix}${command} <user>`);
            let tinodata = { "rank": {}, "user": {} };
            m.channel.send(`${m.author}, fetching **Hypixel API Data**`).then(medit => {
            hypixel.getPlayerByName(key, `${args[0]}`).then(user => {
                if(!user.success || user.success == false || user.player == null || user.player == undefined || !user.player) { medit.delete(); return sendErrorEmbed(m.channel, `Unknown Player`, `Player has no data in Hypixel's Database`); };
                hypixel.getGuildByPlayer(key, `${user.player.uuid}`).then(guild => {
                    switch(user.player.newPackageRank) {
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
                    if(user.player.monthlyPackageRank == "SUPERSTAR") {
                        tinodata.rank.displayName = "[MVP++]";
                        tinodata.rank.name = "MVP++";
                        tinodata.rank.color = minecraftColorToHex("GOLD");
                    }
                    if(user.player.rank != undefined) {
                        let rank = user.player.rank;
                        if(rank == "YOUTUBER") {
                            tinodata.rank.displayName = "[YouTuber]";
                            tinodata.rank.name = "YouTuber";
                            tinodata.rank.color = minecraftColorToHex("RED");    
                        } else {
                            tinodata.rank.displayName = "[" + rank.capitalizeFirst() + "]";
                            tinodata.rank.name = tinodata.rank.displayName.slice(1, tinodata.rank.displayName.length - 1).capitalizeFirst();
                            tinodata.rank.color = minecraftColorToHex("RED");
                        }
                    }
                    if(user.player.prefix != undefined) {
                        let prefix = user.player.prefix;
                        tinodata.rank.displayName = `[${prefix.replace(/[\[\]]|(\§a)|(\§b)|(\§c)|(\§d)|(\§e)|(\§f)|(\§0)|(\§9)|(\§8)|(\§7)|(\§6)|(\§5)|(\§4)|(\§3)|(\§2)|(\§1)|(\§b)|(\§l)|(\§c)|(\§s)|(\§n)|(\§r)/gmi, "").capitalizeFirst()}]`;
                        tinodata.rank.name = tinodata.rank.displayName.slice(1, tinodata.rank.displayName.length - 1).capitalizeFirst();
                        tinodata.rank.color = minecraftColorToHex("RED");
                    }
                    if(user.player.rankPlusColor) tinodata.rank.color = minecraftColorToHex(user.player.rankPlusColor);
                    if(user.player.userLanguage) tinodata.user.language = user.player.userLanguage.capitalizeFirst(); else tinodata.user.language = "Not set";
                    if(user.player.mcVersionRp && user.player.mcVersionRp != undefined && user.player.mcVersionRp != "") tinodata.user.version = user.player.mcVersionRp; else tinodata.user.version = "Not set";
                    if(guild && guild.guild && guild.guild != undefined && guild.guild != null && guild.success == true && guild.guild.name != undefined && guild.guild.name) tinodata.user.guild = `[${guild.guild.name}](https://hypixel.net/guilds/${guild.guild.name_lower.replace(/[ ]/, "+")})`; else tinodata.user.guild = "None";
                    if(user.player.mostRecentGameType && user.player.mostRecentGameType != undefined) tinodata.user.recentGameType = user.player.mostRecentGameType.toCleanGameType();
                    tinodata.user.level = Math.ceil((Math.sqrt(user.player.networkExp + 15312.5) - 125/Math.sqrt(2))/(25*Math.sqrt(2)));
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
                            {name: `**Rank**`, value: `${tinodata.rank.name}`, inline: true},
                            {name: `**Karma**`, value: `${(user.player.karma == undefined) ? 0 : user.player.karma}`, inline: true},
                            {name: `**Level**`, value: `${tinodata.user.level}`, inline: true},
                            {name: `**Language**`, value: `${tinodata.user.language}`, inline: true},
                            {name: `**Version**`, value: `${tinodata.user.version}`, inline: true},
                            {name: `**Guild**`, value: `${tinodata.user.guild}`, inline: true},
                            {name: `**Recent Game Type**`, value: `${(tinodata.user.recentGameType == undefined) ? "Not set" : tinodata.user.recentGameType}`, inline: true},
                            {name: `**First Login**`, value: `${pad(firstLogin.getDate())}/${pad(firstLogin.getMonth() + 1)}/${firstLogin.getFullYear()} - ${pad(firstLogin.getHours())}:${pad(firstLogin.getMinutes())}`, inline: true},
                            {name: `**Last Login**`, value: `${pad(lastLogin.getDate())}/${pad(lastLogin.getMonth() + 1)}/${lastLogin.getFullYear()} - ${pad(lastLogin.getHours())}:${pad(lastLogin.getMinutes())}`, inline: true}
                        )
                        .setTimestamp()
                        .setFooter(embedHelper.footer.text, embedHelper.footer.image.green)
                        if(user.player.socialMedia != undefined && user.player.socialMedia.links) {
                            embed.addField(`\u200b`, `\u200b`);
                            ObjectforEach(user.player.socialMedia.links, function(value, prop, obj) {
                                if(prop == "HYPIXEL") value = `[${value.split("/")[4].split(".")[0]}](${value})`;
                                if(prop == "TWITTER") value = `[${value.split("/")[3]}](${value})`;
                                if(prop == "INSTAGRAM") value = `[${value.split("/")[3]}](${value})`;
                                if(prop == "MIXER") value = `[${value.split("/")[3]}](${value})`;
                                if(prop == "TWITCH") value = `[${value.split("/")[3]}](${value})`;
                                if(prop == "YOUTUBE" && (value.toLowerCase().includes("/channel/") || value.toLowerCase().includes("/user/") || value.toLowerCase().includes("/c/"))) value = `[${value.split("/")[4]}](${value})`;
                                if(prop == "YOUTUBE" && !(value.toLowerCase().includes("/channel/") || value.toLowerCase().includes("/user/") || value.toLowerCase().includes("/c/"))) value = `[${value.split("/")[3]}](${value})`;
                                embed.addField(`**${prop.capitalizeFirst()}**`, `${value}`, true);
                            });
                        }
                        cooldowns.hypixel.main.set(m.author.id, Date.now() + cooldownT);
                        setTimeout(() => cooldowns.hypixel.main.delete(m.author.id), cooldownT);
                        return medit.edit("\u200b", embed);
                });
            }).catch(e => function() {
                medit.edit(`Hypixel API Error`);
                console.log(e);
            });
        });
        }
        
        if(command == "pit") {
            /* Cooldown */
            let cooldownT = 30 * 1000, cooldownG = cooldowns.hypixel.pit.get(m.author.id);
            if(cooldownG) return m.channel.send(`Please wait ${humanizeDuration(cooldownG - Date.now(), { round: true })} before running ${command} again`);


            if(!args[0])  return sendErrorEmbed(m.channel, `Usage`, `${prefix}${command} <user>`);
            let tinodata = { "rank": {}, "user": {}, "pit": {} };
            hypixel.getPlayerByName(key, args[0]).then(user => {
                if(!user.success || user.success == false || user.player == null || user.player == undefined || !user.player) return sendErrorEmbed(m.channel, `Unknown Player`, `Player has no data in Hypixel's Database`);
                    switch(user.player.newPackageRank) {
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
                    if(user.player.monthlyPackageRank == "SUPERSTAR") {
                        tinodata.rank.displayName = "[MVP++]";
                        tinodata.rank.name = "MVP++";
                        tinodata.rank.color = minecraftColorToHex("GOLD");
                    }
                    if(user.player.rankPlusColor) tinodata.rank.color = minecraftColorToHex(user.player.rankPlusColor);

                    const embed = new Discord.MessageEmbed()
                        .setColor(`${tinodata.rank.color}`)
                        .setAuthor(`${m.author.tag}`, `https://cdn.discordapp.com/avatars/${m.author.id}/${m.author.avatar}?size=128`)
                        .setTitle(`${tinodata.rank.displayName} ${user.player.displayname}`)
                        .setURL(`https://hypixel.net/players/${user.player.displayname}`)
                        .setThumbnail(`https://visage.surgeplay.com/head/128/{user.player.uuid}`)
                        .setImage(`https://visage.surgeplay.com/full/512/${user.player.uuid}`)
                        .setTimestamp()
                        .setFooter(embedHelper.footer.text, embedHelper.footer.image.green)
                        if(!user.player.stats.Pit.pit_stats_ptl) {
                            embed.setDescription(`**The Pit**\nCould not retrieve **The Pit** Stats for this user, maybe he/she never joined The Pit!`);
                            return m.channel.send(embed);
                        }
                        embed.addFields(
                            {name: `**Kills**`, value: `${user.player.stats.Pit.pit_stats_ptl.kills}`, inline: true},
                            {name: `**Deaths**`, value: `${user.player.stats.Pit.pit_stats_ptl.deaths}`, inline: true},
                            {name: `**Assits**`, value: `${user.player.stats.Pit.pit_stats_ptl.assists}`, inline: true},
                            {name: `**KDA**`, value: `${((user.player.stats.Pit.pit_stats_ptl.kills+user.player.stats.Pit.pit_stats_ptl.assists)/user.player.stats.Pit.pit_stats_ptl.deaths).toFixed(2)}`, inline: true},
                            {name: `**Max streak**`, value: `${user.player.stats.Pit.pit_stats_ptl.max_streak}`, inline: true},
                            {name: `**Prestige**`, value: `${(!user.player.stats.Pit.profile.prestiges) ? 0 : user.player.stats.Pit.profile.prestiges.length}`, inline: true},
                            {name: `**Joins**`, value: `${user.player.stats.Pit.pit_stats_ptl.joins}`, inline: true},
                            {name: `**Jumps into pit**`, value: `${user.player.stats.Pit.pit_stats_ptl.jumped_into_pit}`, inline: true},
                            {name: `**Playtime**`, value: `${(!user.player.stats.Pit.pit_stats_ptl.playtime_minutes) ? `~0m` : user.player.stats.Pit.pit_stats_ptl.playtime_minutes.toString().toTimeString()}`, inline: true}
                        )
                        .setDescription(`Use [Pit Panda](https://pitpanda.rocks/players/${args[0]}) for more (and detailed) information!`)

                        cooldowns.hypixel.pit.set(m.author.id, Date.now() + cooldownT);
                        setTimeout(() => cooldowns.hypixel.pit.delete(m.author.id), cooldownT);
                        return m.channel.send(embed);
            });
        }
});
const Enmap = require("enmap")
client.points = new Enmap({ name: "points" });
const canvas = require('discord-canvas'),
    welcomeCanvas = new canvas.Welcome(),
    leaveCanvas = new canvas.Goodbye()

const Eco = require("quick.eco");
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.eco = new Eco.Manager(); // quick.eco
client.db = Eco.db; // quick.db
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
client.on("message", async message => {
  const db = require('quick.db');
const startTime = require("./commands/afk.js")

//under if(message.author.bot)

if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        
        
         await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.channel.send(`Your afk status has been removed. Welcome Back! `).then(msg => {
    msg.delete({ timeout: 5000 })
  })
    }
     const nick = message.member.displayName;
            if (nick && nick.startsWith('[AFK]')) {
                message.member.setNickname(message.member.displayName.replace('[AFK]', ''));
            }
    //checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(`${message.mentions.members.first().user.tag}` + " is currently afk. Reason: " + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}.`))
              const endTime = Date.now();
const timeTakenMs = endTime - startTime;
        var timeTakenSeconds = Math.floor(timeTakenMs/1000)
        var timeTakenMinutes = Math.floor(timeTakenSeconds/60)
         var timetakenHours = Math.floor(timeTakenMinutes/60)
        var timetakenDays = Math.floor(timetakenHours/24)
       var timetakenWeeks = Math.floor(timetakenDays/7)
        var timetakenMonths = Math.floor(timetakenDays/30)
        var timetakenYears = Math.floor(timetakenMonths/12)
       while (timeTakenSeconds>=60){
          timeTakenSeconds = timeTakenSeconds-60;
          
        }
        while (timetakenMonths>12){
          timetakenMonths = timetakenMonths-12
        }
        while(timetakenDays>7&&timetakenDays<30){
          timetakenDays = timetakenDays - 7
        }
        while(timetakenDays>30){
          timetakenDays = timetakenDays - 30
        }
        
        while (timetakenHours>=24){
          timetakenHours = timetakenHours-24
        }
  
        
       while (timeTakenMinutes >= 60){
        timeTakenMinutes = timeTakenMinutes-60;
    }
     
     
     if (timetakenHours== 0 && timeTakenMinutes==0 && timeTakenSeconds>0){
       message.channel.send(`They have been afk for ${timeTakenSeconds} seconds.`).catch(err=>{
         message.channel.send(`There has been a fatal error when running this command. Please use the ymisc!report command with the following error:${err}`)
       })
     }
     else if(timetakenDays==0 && timetakenHours>0 && timeTakenMinutes>=0 && timeTakenSeconds>=0){
       message.channel.send(`They have been AFK for ${timetakenHours} hours, ${timeTakenMinutes} minutes and ${timeTakenSeconds} seconds.`, true).catch(err=>{
         message.channel.send(`There has been a fatal error when running this command. Please use the ymisc!report command with the following error:${err}`)
       })
     }
     else if(timetakenDays==0 && timetakenHours==0 && timeTakenMinutes>0 && timeTakenSeconds>=0){
       message.channel.send(`They have been AFK for ${timeTakenMinutes} minutes and ${timeTakenSeconds} seconds.`, true).catch(err=>{
         message.channel.send(`There has been a fatal error when running this command. Please use the ymisc!report command with the following error:${err}`)
       })
     }
else{
        message.channel.send(`They have been afk for ${timetakenDays} days, ${timetakenHours} hours, ${timeTakenMinutes} minutes and ${timeTakenSeconds} seconds.`, true).catch(err=>{
         message.channel.send(`There has been a fatal error when running this command. Please use the ymisc!report command with the following error:${err}`)
       })
}
          

        }else return;
    }else;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.channel.type === `dm`) return;
    //////////////////////////////////////////
    /////////////RANKING SYSTEM///////////////
    //////////////////////////////////////////
    //get the key of the user for this guild
    const key = `${message.guild.id}-${message.author.id}`;
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
      client.points.math(key, `+`, randomnum, `points`)
      client.points.inc(key, `points`);
    }
    //if not too short do this
    else {
      //get a random num between rounded but it belongs to message length
      var randomnum = 1 + Math.floor(msgl * 100) / 100
      //basically databasing again
      client.points.math(key, `+`, randomnum, `points`)
      client.points.inc(key, `points`);
    }
    //get current level
    const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, `points`)));
    //if its a new level then do this
    if (client.points.get(key, `level`) < curLevel) {
      //define ranked embed
      const embed = new Discord.MessageEmbed()
        .setTitle(`Ranking of ${message.author.username}`)
        .setTimestamp()
        .setDescription(`You've leveled up to Level: **\`${curLevel}\`**! (Points: \`${Math.floor(client.points.get(key, `points`) * 100) / 100}\`) `)
        .setColor("GREEN");
      //send ping and embed message
      message.channel.send(`<@` + message.author.id + `>`);
      message.channel.send(embed);
      //set the new level
      client.points.set(key, curLevel, `level`);
    }
    //else continue or commands...
    //
    if (message.content.toLowerCase().startsWith(`${client.prefix}rank`)) {
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
      const key = `${message.guild.id}-${rankuser.id}`;
      //math
      let curpoints = Number(client.points.get(key, `points`).toFixed(2));
      //math
      let curnextlevel = Number(((Number(1) + Number(client.points.get(key, `level`).toFixed(2))) * Number(10)) * ((Number(1) + Number(client.points.get(key, `level`).toFixed(2))) * Number(10)));
      //if not level == no rank
      if (client.points.get(key, `level`) === undefined) i = `No Rank`;
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
        .setLevel(Number(client.points.get(key, `level`)), "Level", true)
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
          await message.channel.send(embed);
          //delete that temp message
          await tempmsg.delete();
          return;
        });
    }
    //leaderboard command
    if (message.content.toLowerCase() === `${client.prefix}xpleaderboard`|| message.content.toLowerCase()=== `${client.prefix}xplb`) {
      //some databasing and math
      const filtered = client.points.filter(p => p.guild === message.guild.id).array();
      const sorted = filtered.sort((a, b) => b.points - a.points);
      const top10 = sorted.splice(0, 10);
      const embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}: Leaderboard`)
        .setTimestamp()
        .setDescription(`Top 10 Ranking:`)
        .setColor("ORANGE");
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
      return message.channel.send(embed);
    }
   

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
if (message.content.startsWith("y!welcometest")){
  client.emit('guildMemberAdd', message.member);
}
if (message.content.startsWith("y!leavetest")){
  client.emit('guildMemberRemove', message.member);
}
if(message.content.toLowerCase().startsWith('y!jointest')){
  client.emit('guildCreate', message.guild)
}

    if (message.content.includes(`@<${client.user.id}>`)){
        message.channel.send(`Hello there! I'm Yarn, the All in 1 Discord Bot! My prefix in this server is ${client.prefix} `);
    }

});



client.on('ready', async () => {
	console.log('Well done, prefix migration complete without errors.')

    });
	


const fs = require("fs");

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
    guild.systemChannel.send(embed)
 client.channels.cache.get(`829432199261716480`).send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
 	
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
   client.channels.cache.get(`829432200062959636`).send(`I have been removed from: ${guild.name} (id: ${guild.id}). This guild had ${guild.memberCount} members! Oof.`);
});
	
	
	


  
client.login(client.config.token);