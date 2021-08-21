module.exports = (client, queue, track) => {
  queue.metadata.send(
      `${client.emotes.play} | Now playing: **${track.title} - ${track.url}** in **${queue.connection.channel.name}**!`,
  );
};
