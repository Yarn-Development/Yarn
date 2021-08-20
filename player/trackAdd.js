module.exports = (client,queue,track) => {
    queue.metadata.send(`${client.emotes.success} | Added ${track.title} into the queue!`)
}