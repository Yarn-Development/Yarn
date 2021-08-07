const { Discord, Client, MessageEmbed } = require('discord.js') 

 exports.execute = async(client, message, args) => {
   if(!client.config.admins.includes(message.author.id)) return;
   let serverlist = ''
   
        const embed = new MessageEmbed()
        embed.setColor("RANDOM")
        embed.setTitle(`Servers that have ${client.user.username}`)
        client.guilds.cache.forEach((guild) => {
            embed.addField( `${guild.name}`,`ID: ${guild.id} \n Members: ${guild.memberCount}`)
            
        })
    
        
        message.channel.send({embed});
  }
  
  module.exports.help = {
  
  name: 'guilds',
 aliases: ['guild'],
 usage:'guilds',
 category:'Owner',
  description: 'List of servers',
}
