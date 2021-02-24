const Discord = require("discord.js");



exports.execute =  async(client, message, args) => {

  let user = message.mentions.users.first() || message.author
  client.users.cache.get(args[0]) ||
  (args.join(" ").toLowerCase(), message.guild) || 
  message.author;

  let bal = await client.db.fetch(`money_${message.guild.id}_${user.id}.pocket`);
  if (bal === null) bal = 0;

  let bank = await client.db.fetch(`money_${message.guild.id}_${user.id}.bank`);
  if (bank === undefined) bank = 0;

  let TotalMoney = bank + bal;

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`**${user}'s Balance**\n
  **Pocket:** ${bal}
  **Bank:** ${bank}
  **Total:** ${TotalMoney}`);
  message.channel.send(moneyEmbed)
	}
  exports.help = {
    name: "bal",
    aliases: ["money", "credits", "balance"],
    usage: `bal`
}
