const Discord = require("discord.js");

exports.execute = async (client,message,args) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("Donate!")
  embed.addField('Get a bot for yourself!','Like what you see? Want one for yourself? Well if you donate to https://paypal.me/aspekts you can get one of your own!'),
  embed.addField('Multiple succesful purchases!',"Aspekts has successfully made 7 bots for other people, all of whom have donated to the paypal! You could be the 8th, so donate now!"),
  embed.setFooter("Its worth it!")
  message.channel.send({embeds:[embed]})
}
exports.help = {
  name: 'donate',
  aliases:[],
  category:'Misc',
  usage:'donate'
}