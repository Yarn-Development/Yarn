const fetch = require("node-fetch");
const Discord = require("discord.js");
module.exports.execute = async (client, message, args) => {
  let countries = args.join(" ");

  //Credit to Sarastro#7725 for the command :)

  const noArgs = new Discord.MessageEmbed()
    .setTitle("Missing arguments")
    .setColor(0xff0000)
    .setDescription(
      "You are missing some args (ex: ymisc!covid all || ymisc!covid Canada)"
    )
    .setTimestamp();

  if (!args[0]) return message.channel.send({ embeds: [noArgs] });

  if (args[0] === "all") {
    fetch(`https://covid19.mathdro.id/api`)
      .then((response) => response.json())
      .then((data) => {
        let confirmed = data.confirmed.value.toLocaleString();
        let recovered = data.recovered.value.toLocaleString();
        let deaths = data.deaths.value.toLocaleString();

        const embed = new Discord.MessageEmbed()
          .setTitle(`Worldwide COVID-19 Stats 🌎`)
          .addField("Confirmed Cases", confirmed)
          .addField("Recovered", recovered)
          .addField("Deaths", deaths);

        message.channel.send({ embeds: [embed] });
      });
  } else {
    fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
      .then((response) => response.json())
      .then((data) => {
        let confirmed = data.confirmed.value.toLocaleString();
        let recovered = data.recovered.value.toLocaleString();
        let deaths = data.deaths.value.toLocaleString();

        const embed = new Discord.MessageEmbed()
          .setTitle(`COVID-19 Stats for **${countries}**`)
          .addField("Confirmed Cases", confirmed)
          .addField("Recovered", recovered)
          .addField("Deaths", deaths);

        message.channel.send({ embeds: [embed] });
      })
      .catch((e) => {
        return message.channel.send("Invalid country provided");
      });
  }
};
exports.help = {
  name: "covid",
  aliases: ["c"],
  category: "Misc",
  usage: "covid",
};
