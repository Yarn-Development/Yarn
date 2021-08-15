const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
    let ping = await client.db.ping()
    let gatewayLatency = Math.floor(client.ws.ping);
    message.channel.send("Pinging...").then(m => {
        const trip = Math.floor(m.createdTimestamp - message.createdTimestamp);
        const embed = new MessageEmbed()
            .setTitle("Pong!")
            .addField("API Latency", `${gatewayLatency}ms`, true)
            .addField("Client Latency", `${trip}ms`, true)
            .addField("DB Average Latency",`${ping.average}ms`,true)
            .addField("DB Read Latency",`${ping.read}ms`,true)
            .addField("DB Write Latency",`${ping.write}ms`,true)
            .setColor("#7289DA")
            .setTimestamp();
        m.edit({embeds:[embed]});
    });
}

exports.help = {
    name: "ping",
    aliases: ["pong", "latency"],
    usage: `ping`,
    description:"Displays current latency from api, database and Client."
  
}
