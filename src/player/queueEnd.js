module.exports = (client, queue) => {
	queue.metadata.send(
		`${client.emotes.play} | That wraps up the queue for now, add some more songs and keep the party going on!`,
	);
};
