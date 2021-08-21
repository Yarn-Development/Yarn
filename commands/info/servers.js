const Discord = require("discord.js");
exports.execute = async (client, message, args) => {
  var number = client.users.cache.size;
  var roundedNumber = Math.ceil(number / 100) * 100;

  const embed = new Discord.MessageEmbed();
  embed.setTitle("Server Dominance");
  embed.setColor("BLURPLE");
  embed.setDescription(
    `Yarn is in ${client.guilds.cache.size} servers with around ${roundedNumber} users `
  );
  return message.channel.send({ embeds: [embed] });
};
exports.help = {
  name: "servers",
  aliases: ["dominance"],
  usage: "servers",
};
