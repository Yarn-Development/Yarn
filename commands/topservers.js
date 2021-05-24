
const { MessageEmbed } = require(`discord.js`);


    exports.execute= async(client,message,args) => {
      if(!client.config.admins.includes(message.author.id))return;
      else{
        const Map = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(10).map((guild) => {
            return guild.name
        }).join("\n")
        const embed = new MessageEmbed()
            .setTitle(`Top 10 servers`)
            .setDescription(Map)
            .setColor("RANDOM")
        message.channel.send(embed)
    }
    }
    exports.help = {
      name:'topservers',
      aliases:[],
      usage:'topservers'
    }


