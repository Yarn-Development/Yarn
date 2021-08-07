const Discord = require("discord.js")
const got = require('got');

module.exports = (client) => {


    console.log(`${client.user.tag} is online!`);
  console.log(`
╔██╗   ██╗ █████╗ ██████╗ ███╗  ██╗
╚██╗ ██╔╝██╔══██╗██╔══██╗████╗  ██║
 ╚████╔╝ ███████║██████╔╝██╔██╗ ██║
  ╚██╔╝  ██╔══██║██╔══██╗██║╚██╗██║
   ██║   ██║  ██║██║  ██║██║ ╚████║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
                                   
  `)
	
			let version = client.config.version
	const readyembed = new Discord.MessageEmbed()
.setTitle("Online!")
.setThumbnail(client.user.displayAvatarURL())
.addField('Yarn Wrapped.', `Logged in successfully as ${client.user.tag}!`)
.setFooter("This was ")
.setTimestamp()
client.channels.cache.get('829432185110790234').send(readyembed)
  const status = [
    {
      activity: `over ${client.guilds.cache.size}/100 servers! #RoadtoVerification`,
      type: "WATCHING",
    },
    {
      activity: `${client.users.cache.size} users in ${client.guilds.cache.size} servers.`,
      type: "WATCHING",
    },
    {
      activity: "around with the cat",
      type: "PLAYING",
    },
    {
      activity: " with the 🧶",
      type: "PLAYING",
    },
    {
      activity: "Aspekts lose his freetime",
      type: "WATCHING",
    },
    {
      activity: "yarndev.xyz",
      type: "LISTENING",
    },
    {
      activity: `${client.users.cache.size} users!`,
      type: "WATCHING",
    },
    {
      activity:`the bot uprising`,
      type:"COMPETING",
    },
    {
      activity:`the newest Yarn Update, to ${version}`,
      type:`COMPETING`
    },
  ];
  setInterval(async function () {
    client.users.cache.tap((coll) => (users = coll.size));
    client.guilds.cache.tap((coll) => (guilds = coll.size));
    random = status[Math.floor(Math.random() * Math.floor(status.length))];
    client.user.setActivity(`${random.activity} | y!help`, {
      type: random.type,
    });
  }, 20000);
		
	}
