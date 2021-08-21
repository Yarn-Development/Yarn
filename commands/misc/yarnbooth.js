const { Permissions } = require("discord.js")

exports.execute = async(client,message,args) => {
    const channel = message.mentions.channels.first()
    if(!channel) return message.channel.send("Please mention a channel to set the YarnBooth to!")
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.channel.send(`You are missing the **MANAGE GUILD** permission!`)
    if(args[0]== "disable"){
        client.db.delete(`g_${message.guild.id}`,channel.id)
        message.channel.send(`YarnBooth successfully disabled in ${channel}.`)
    }
   else{
    client.db.set(`g_${message.guild.id}`, `${channel.id}`);
    message.channel.send(`YarnBooth Set to ${channel}!`);
   }

}
exports.help = {
    name:'yarnbooth',
    aliases:['yb','global'],
    category:'Fun',
    usage:`yarnbooth #channel || yarnbooth disable #channel`,
}
