exports.execute = async (client, message) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      `${client.emotes.error} - You're not in a voice channel !`
    );

  if (
    message.guild.me.voice.channel &&
    message.member.voice.channel.id !== message.guild.me.voice.channel.id
  )
    return message.channel.send(
      `${client.emotes.error} - You are not in the same voice channel !`
    );
  const queue = client.player.getQueue(message.guild.id, {
    metadata: message.channel,
  });
  if (!queue || !queue.playing)
    return void queue.metadata.send({
      content: `${client.emotes.error} | No music is being played!`,
    });
  const currentTrack = queue.current;
  const success = queue.skip();
  return void queue.metadata.send({
    content: success
      ? `${client.emotes.success} | Skipped **${currentTrack}**!`
      : `${client.emotes.error} | Something went wrong!`,
  });
};
module.exports.help = {
  name: "skip",
  aliases: ["sk"],
  category: "Music",
  usage: "skip",
};
