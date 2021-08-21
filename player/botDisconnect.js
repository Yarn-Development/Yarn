module.exports = (client, queue) => {
  queue.metadata.send(
    `${client.emotes.error} | I have been disconnected from the voice channel, clearing queue!`
  );
};
