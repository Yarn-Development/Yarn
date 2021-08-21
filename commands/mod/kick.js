const Discord = require("discord.js")
module.exports.execute = async (client, message, args) => {

  if (!message.member.hasPermission("KICK_MEMBERS")  && message.author.id !== "291221132256870400") return message.channel.send("Sorry, you don't have permissions to use this!");
    
  let xdemb = new Discord.MessageEmbed()
  .setColor("#00ff00")
  .setTitle("Kick Command")
  .addField("Description:", `Kick a member`, true)
  .addField("Usage:", "ymod!kick [user] [reason]", true)
  .addField("Example:" ,"ymod!kick @Aspekts spam")

    let member = message.mentions.members.first();
    if(!member) return message.channel.send({embeds:[xdemb]})
      if(member.id === message.author.id)
      return message.channel.send("You can't kick yourself. Ever. ");
   if (!member.kickable) 
      return message.channel.send("I cannot kick this user!");
   if(member.user.id === "294870523438170112") return message.channel.send("I can't kick my owner!")

    
    let reason = args.slice(1).join(' ');
    if(!reason) {
      res = "No reason given";
    }
    else {
      res = `${reason}`
    }
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry, I couldn't kick because of : ${error}`));

      let kick = new Discord.MessageEmbed()
      .setColor("#00ff00")
      .setTitle(`Kick | ${member.user.tag}`)
      .addField("User", member, true)
      .addField("Moderator", message.author, true)
      .addField("Reason", res)
      .setTimestamp()
      .setFooter(member.id)

      message.channel.send({embeds:[kick]})

    message.delete();
    
}
      module.exports.help = {
        name: "kick",
        aliases:[],
        usage:'kick @user'
      }