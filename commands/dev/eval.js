const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const Beautify = require('beautify');


module.exports.execute = async (client, message, args) => {
  if (message.author.bot) return;
    let prefix = client.prefix;

  
  if (message.author.id !== "294870523438170112") {
    return message.channel.send(":x: Forbidden: This Command is Owner-Only!")
  }
  
  if (!args[0]) {
    message.channel.send("You need to evaluate _**SOMETHING**_ Please!")
  }
  
  try {
    if (args.join(" ").toLowerCase().includes("token")) {
      return;
    }
    
    const toEval = args.join(" ");
    const evaluated = eval(toEval);
    
    let embed = new Discord.MessageEmbed()
    .setTitle("Eval")
    .addField("ToEvaluate", `\`\`\`js\n${Beautify(args.join(" "), { format: "js" })}\n\`\`\``)
    .addField("Evaluated", evaluated)
    .addField("Type of:", typeof(evaluated))
    .setTimestamp()
    .setFooter(`${message.author.tag}`, client.user.displayAvatarURL())
    message.channel.send({embeds:[embed]});
    
  } catch (e) {
    let errorembed = new Discord.MessageEmbed()
    .addField("\:x:", "Error!")
    .setDescription(e)
    .setTimestamp()
    .setFooter(`${message.author.tag}`, client.user.displayAvatarURL())
    message.channel.send({embeds:[errorembed]});
  }
}
exports.help = {
  name:'eval',
  aliases:[],
  usage:'eval <code>',
  category:'Owner'
}
