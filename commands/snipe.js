const Discord = require('discord.js');

module.exports.execute = async (client, message, args) => {
   {
      
    const msg = client.snipes.get(message.channel.id)
    
   
    if(!msg){ return message.channel.send("There are no deleted messages in this channel!")}
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${msg.author}`,message.author.displayAvatarURL())
    .setTimestamp()
    .setFooter('Get sniped lol')
    .setDescription(msg.content)
   
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send({embeds:[embed]})
     
     
   }
  
  
}

module.exports.help= {
    name: "snipe",
    aliases: ["s"],
    category:'Moderation',
    usage:'snipe'
}
