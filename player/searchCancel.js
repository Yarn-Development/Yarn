module.exports = (queue, query, tracks) => {
    queue.metadata.send(`${client.emotes.error} - You did not provide a valid response ... Please send the command again !`);
};