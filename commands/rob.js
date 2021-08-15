const Discord = require("discord.js");
const ms = require("parse-ms");



exports.execute =  async (client, message, args) => {  

  let user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    (args.join(" ").toLowerCase(), message.guild);

  let targetuser = await client.db.get(`money_${message.guild.id}_${user.id}.pocket`);
  let author     = await client.db.get(`rob_${message.guild.id}_${message.author.id}`);
  let author2    = await client.db.get(`money_${message.guild.id}_${message.author.id}.pocket`);

  let timeout = 6000000;

if (author !== null && timeout - (Date.now() - author) > 0) {
    
  let time = ms(timeout - (Date.now() - author));

    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You have already robbed someone\n\nTry again in ${time.minutes}m ${time.seconds}s `);
    message.channel.send({embeds:[timeEmbed]})

  } else {

    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You need at least 200 🧶 in your wallet to rob someone`);


  if (author2 < 200) {
    return message.channel.send({embeds:[moneyEmbed]})
  }

  let moneyEmbed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`${user.username} does not have anything you can rob`);

  if (targetuser <= 0 || targetuser === null) {
    return message.channel.send({embeds:[moneyEmbed2]})
  }

  let authorembed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You cannot rob yourself!`);

  if(user.id === message.author.id) {
    return message.channel.send({embeds:[authorembed]})
  }

  let vip = await client.db.get(`bronze_${user.id}`)

  if(vip === true) random = Math.floor(Math.random() * parseInt(targetuser)) + 1;
  if(vip === null) random = Math.floor(Math.random() * 100) + 1;


  let embed = new Discord.MessageEmbed()
   .setDescription(`You robbed ${user} and got away with ${random} 🧶`)
   .setColor("#FFFFFF")

   message.channel.send({embeds:[embed]})

await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, random);
await client.db.add(`money_${message.guild.id}_${message.author.id}.pocket`, random);
await client.db.set(`rob_${message.guild.id}_${message.author.id}`, Date.now());
  
		}
	}
  module.exports.help = {
	 name: "rob",
   aliases:[],
   category:'Economy',
		description: "Rob someone!",
		usage:'rob @user'
	}
