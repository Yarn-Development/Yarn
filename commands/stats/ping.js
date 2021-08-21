const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
  const queue = client.player.getQueue(message.guild);
  let ping = await client.db.ping();
  let gatewayLatency = Math.floor(client.ws.ping);
  message.channel.send("Pinging...").then((m) => {
    const trip = Math.floor(m.createdTimestamp - message.createdTimestamp);
    const embed = new MessageEmbed()
      .setTitle("Pong!")
      .addField("API Latency", `${gatewayLatency}ms`, true)
      .addField("Client Latency", `${trip}ms`, true)
      .addField("DB Average Latency", `${ping.average}ms`, true)
      .addField("DB Read Latency", `${ping.read}ms`, true)
      .addField("DB Write Latency", `${ping.write}ms`, true);
    if (queue.connection) {
      embed.addField(
        "Voice Latency",
        !queue
          ? "N/A"
          : `UDP: \`${
              queue.connection.voiceConnection.ping.udp ?? "N/A"
            }\`ms\nWebSocket: \`${
              queue.connection.voiceConnection.ping.ws ?? "N/A"
            }\`ms`
      );
    }
    embed.setColor("#7289DA");
    embed.setTimestamp();
    m.edit({ embeds: [embed] });
  });
};

exports.help = {
  name: "ping",
  aliases: ["pong", "latency"],
  usage: `ping`,
  description: "Displays current latency from api, database and Client.",
};
