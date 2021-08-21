module.exports = (client, queue, query, tracks, content, collector) => {
  if (content === 'cancel') {
    collector.stop();
    return queue.metadata.send(
        `${client.emotes.success} - The selection has been **cancelled** !`,
    );
  } else {
    queue.metadata.send(
        `${client.emotes.error} - You must send a valid number between **1** and **${tracks.length}** !`,
    );
  }
};
