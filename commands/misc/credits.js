const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle("Credits")
    .setDescription(
      "The people below have assisted in one way or another for the development of yarn."
    )
    .addField("Creator", "[Aspekts#4616](https://www.twitch.tv/aspekts)")
    .addField("Playtesters", "Harambe#2876\nLolmantis#7550")
    .addField("Special Thanks", "TurkeyDev#6719\n0_0#6666")
    .addField(
      "Honourable Mentions",
      "Dvance#0784\nBobster#9329\nwow your bad#1000"
    );
  message.channel.send({ embeds: [embed] });
};
exports.help = {
  name: "credits",
  aliases: [],
  category: "Misc",
  usage: "credits",
};
