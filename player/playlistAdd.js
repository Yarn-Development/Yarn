module.exports = (client, queue, playlist) => {
  queue.metadata.send(
    `${client.emotes.music} - ${playlist.title} (**${playlist.tracks.length}** songs) has been added to the queue!`
  );
};
