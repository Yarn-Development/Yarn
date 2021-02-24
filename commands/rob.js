const Discord = require("discord.js");
const ms = require("parse-ms");



module.exports.execute = async (client, message, args) => {  

  let user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    (args.join(" ").toLowerCase(), message.guild);

  let targetuser = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`);
  let author     = await client.db.fetch(`rob_${message.guild.id}_${message.author.id}`);
  let author2    = await client.db.fetch(`money_${message.guild.id}_${message.author.id}.pocket`);

  let timeout = 6000000;

if (author !== null && timeout - (Date.now() - author) > 0) {
    
  let time = ms(timeout - (Date.now() - author));

    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:x: You have already robbed someone\n\nTry again in ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)

  } else {

    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:x: You need at least 200 coins in your wallet to rob someone`);


  if (author2 < 200) {
    return message.channel.send(moneyEmbed)
  }

  let moneyEmbed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:x: ${user.username} does not have anything you can rob. Cmon bruh don't try rob the broke guy.`);

  if (targetuser <= 0 || targetuser === null) {
    return message.channel.send(moneyEmbed2)
  }

  let authorembed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:x: You cannot rob yourself!`);

  if(user.id === message.author.id) {
    return message.channel.send(authorembed)
  }

 random = Math.floor(Math.random() * 100) + 1;


  let embed = new Discord.MessageEmbed()
   .setDescription(`:white_check_mark: You robbed ${user} and got away with ${random} coins`)
   .setColor("#FFFFFF")

   message.channel.send(embed)

await client.db.subtract(`money_${message.guild.id}_${user.id}.pocket`, random);
await client.db.add(`money_${message.guild.id}_${message.author.id}.pocket`, random);
await client.db.set(`rob_${message.guild.id}_${message.author.id}`, Date.now());
  
		}
	}
  module.exports.help = {
		name: "rob",
		description: "Rob someone!",
		aliases:[],
    usage:'rob @user'
	}